import { LoadFonts } from './font/loader';
import '../axios/interceptor'; // init the interceptor

// static class
export class Loader {
    private static font_loaded: boolean = false;
    private static loadFonts() {
        if (this.font_loaded) throw Error('(fn)loadFonts can only be triggered once');
        this.font_loaded = true; // flagged
        LoadFonts();
    }
    public static init() {
        this.loadFonts();
    }
}
