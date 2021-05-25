type TGetItemReturnedType = ReturnType<typeof localStorage.getItem>;

export class LocalStorage {
  static store_single_data_as_key_value(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  static get_data_from_key(key: string): TGetItemReturnedType {
    return localStorage.getItem(key);
  }
}
