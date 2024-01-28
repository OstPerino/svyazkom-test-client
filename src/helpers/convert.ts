// @ts-nocheck

export interface IConvert {
	snakeToCamel: (str: any) => any;
	camelToSnake: (str: any) => any;
	convertToCamel: (obj: any) => any;
	convertToSnake: (obj: any) => any;
}

export class Convert implements IConvert {
	public snakeToCamel(str: any) {
		return str.replace(/_([a-z])/g, function(match: any, letter: any) {
			return letter.toUpperCase();
		});
	}

	public camelToSnake(str: string) {
		const newString = str.replace(
			/[A-Z]/g,
			(letter: string) => `_${letter.toLowerCase()}`
		);
		return newString;
	}

	public convertToCamel(obj: any): any {
		if (typeof obj !== "object" || obj === null) {
			return obj;
		}

		if (Array.isArray(obj)) {
			return obj.map((item) => this.convertToCamel(item));
		}

		const converted = {};
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				const camelCaseKey = this.snakeToCamel(key);
				converted[camelCaseKey] = this.convertToCamel(obj[key]);
			}
		}

		return converted;
	}

	public convertToSnake(obj: any): any {
		if (typeof obj !== "object" || obj === null) {
			return obj;
		}

		if (Array.isArray(obj)) {
			return obj.map((item) => this.convertToSnake(item));
		}

		const converted = {};
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				const snakeCaseKey = this.camelToSnake(key);
				converted[snakeCaseKey] = this.convertToSnake(obj[key]);
			}}

		return converted;
	}

}
