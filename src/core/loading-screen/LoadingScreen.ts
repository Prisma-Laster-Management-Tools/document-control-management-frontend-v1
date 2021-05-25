import { SetterOrUpdater } from 'recoil';
import { ILoadingScreenAtom } from '../../store/recoil/loading-screen/loading-screen.interface';
export class LoadingScreen {
  static $recoil_loadingScreen_setter: SetterOrUpdater<ILoadingScreenAtom> | null = null;
  static instanciate_recoil($set: SetterOrUpdater<ILoadingScreenAtom>) {
    this.$recoil_loadingScreen_setter = $set;
  }
  static show_loading_screen(info_text: string) {
    if (!this.$recoil_loadingScreen_setter) return;
    this.$recoil_loadingScreen_setter({ visible: true, info_text });
  }
  static hide_loading_screen() {
    if (!this.$recoil_loadingScreen_setter) return;
    this.$recoil_loadingScreen_setter({ visible: false, info_text: '' });
  }
}
