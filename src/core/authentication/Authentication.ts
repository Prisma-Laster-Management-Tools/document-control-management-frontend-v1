import { RecoilValue, SetterOrUpdater } from 'recoil';
import { IAuthenticationState, ITokenCredential } from '../../store/recoil/authentication/authentication.interface';
import { LocalStorage } from '../persist/local-storage';
import jwt from 'jsonwebtoken';
interface IRecoilPersistSignature {
  get: null | IAuthenticationState;
  set: null | SetterOrUpdater<IAuthenticationState>;
}

export class Authentication {
  static $recoil_authentication: IRecoilPersistSignature = {
    get: null, // this is only for getting the value to read -> {NOT AN ACTUAL RECOIL TO SET THE OBSERVABLE ON IT}
    set: null,
  };
  static $recoil_authentication_need_init: boolean = true;
  static store_token_in_localstorage(token: string) {
    LocalStorage.store_single_data_as_key_value('token', token);
    console.log('AccessToken has been stored into the localstorage');
  }
  static decode_token_and_store_in_recoil(token: string): boolean {
    const decoded_data = jwt.decode(token) as ITokenCredential;
    if (!decoded_data) {
      localStorage.removeItem('token'); // remove token
      return false;
    }
    this.$recoil_authentication.set!((prevState) => ({ ...prevState, isAuthenticated: true, userData: decoded_data }));
    return true;
  }
  static instanciate_recoil($get: IAuthenticationState, $set: SetterOrUpdater<IAuthenticationState>) {
    if (!Authentication.$recoil_authentication_need_init) {
      Authentication.$recoil_authentication.get = $get;
    } else {
      console.log('[Authentication]: Auth-related recoil has been stored to the authentication class');
      Authentication.$recoil_authentication.get = $get;
      Authentication.$recoil_authentication.set = $set;
      Authentication.$recoil_authentication_need_init = false;
    }
  }
  static load_stored_token_in_the_local_storage() {
    const access_token = LocalStorage.get_data_from_key('token');
    if (!access_token) return;
    console.log('[jwt]: found existing jwt-token');
    this.decode_token_and_store_in_recoil(access_token);
  }
}
