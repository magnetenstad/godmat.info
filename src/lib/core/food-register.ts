
import {
	collection,
	query,
	getDocs,
	setDoc,
	getDoc,
	doc,
	deleteDoc,
	where,
	limit,
	updateDoc,
	orderBy,
	Query,
	deleteField
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Food, FoodTag } from './food';

export { FoodRegister };

namespace FoodRegister {
	const max_count: number = 5;
	const nameRef = doc(db, 'ext', 'names');
	let keyNamePairs: Object;

	export async function init() {
		getDoc(nameRef).then((docSnap) => {
			if (!docSnap.exists()) {
				setDoc(nameRef, {});
				keyNamePairs = {};
			} else {
				keyNamePairs = docSnap.data();
			}
		});
	}

	async function updateKeyNamePair(id: string, name: string) {
		keyNamePairs[id] = name;
		let data = {};
		data[id] = name;
		await updateDoc(nameRef, data);
	}

	async function deleteKeyNamePair(id) {
		delete keyNamePairs[id];
		let data = {};
		data[id] = deleteField();
		await updateDoc(nameRef, data);
	}

	/**
	 * Puts `food` into the database, with `food.getId()` as key.
	 *
	 * @param food the food to put
	 */
	export async function put(food: Food): Promise<void> {
		const ref = doc(db, 'foodRegister', food.getId());
		await setDoc(ref, Object.assign(new Object(), food));
		await updateKeyNamePair(food.getId(), food.getName());
		console.log(`[DB] Wrote ${food.getName()}`);
	}

	/**
	 * Removes `food` from the database.
	 * `food` will not be removed if it is an ingredient of another food.
	 *
	 * @param food the food to be removed
	 * @returns `true` if `food` was removed, `false` otherwise.
	 */
	export async function remove(food: Food): Promise<boolean> {
		if (food.hasParents()) {
			console.warn(`[DB] Could not delete ${food.getName()}`);
			return false;
		}
		await food.getIngredients((ingredient) => {
			ingredient.removeParent(food);
		});
		const ref = doc(db, 'foodRegister', food.getId());
		await deleteDoc(ref);
		deleteKeyNamePair(food.getId());
		console.log(`[DB] Deleted ${food.getName()}`);
		return true;
	}

	/**
	 * Gets the food from the database with `id`.
	 *
	 * @param id the id of the food to get
	 * @returns the food with `id`, or null
	 */
	export async function get(id: string): Promise<Food> {
		const ref = doc(db, 'foodRegister', id);
		const docSnap = await getDoc(ref);
		if (docSnap.exists()) {
			const food = Object.assign(new Food(), docSnap.data());
			console.log(`[DB] Read ${food.getName()}`);
			return food;
		} else {
			console.log(`[DB] Could not read ${id}!`);
			return null;
		}
	}

	/**
	 * Gets foods from the database.
	 *
	 * @param tag the tag to filter on
	 * @returns array of all foods
	 */
	export async function getAll(callback, tag: FoodTag = null) {
		let q: Query = (tag !== null)
			? query(
				collection(db, 'foodRegister'),
				where('_tags', 'array-contains', tag),
				orderBy('_time', 'desc'),
				limit(max_count))
			: query(
				collection(db, 'foodRegister'),
				orderBy('_time', 'desc'),
				limit(max_count));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((docSnap) => {
			callback(Object.assign(new Food(), docSnap.data()));
		});
		console.log(`[DB] Read all!`);
	}

	/**
	 * Gets all foods whose names include `searchString`.
	 *
	 * @param searchString the string to search for
	 * @param tag the tag to filter on
	 * @returns array of matching foods
	 */
	export async function getMatches(
		searchString: string,
		callback,
		tag: FoodTag = null
	) {
		let count = 0;
		for (let key of Object.keys(keyNamePairs)) {
			let name = keyNamePairs[key];
			if (name.toLowerCase().includes(searchString.toLowerCase())) {
				let food: Food = await get(key);
				if (tag === null || food.hasTag(tag)) {
					callback(food);
					count += 1;
					if (count == max_count) {
						break;
					}
				}
			}
		}
		console.log(`[DB] Read matches of ${searchString}!`);
	}

	export async function writeParents(child: Food) {
		const ref = doc(db, 'foodRegister', child.getId());
		await updateDoc(ref, { _parents: child.getParentIds() });
	}

	export async function hasKey(key: string): Promise<boolean> {
		const ref = doc(db, 'foodRegister', key);
		const docSnap = await getDoc(ref);
		return docSnap.exists();
	}

	export function getNames(ids: Array<string>, callback) {
		for (let id of ids) {
			callback(keyNamePairs[id]);
		}
	}
}
