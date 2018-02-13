export interface AddressOptions {
    lat?: number;
    lng?: number;
    address?: string;
}
export interface NavigateToOptions {
    from?: AddressOptions;
    to: AddressOptions | Array<AddressOptions>;
    ios?: {
        preferGoogleMaps?: boolean;
        allowGoogleMapsWeb?: boolean;
    };
}
export interface DirectionsApi {
    available(): Promise<any>;
    navigate(options: NavigateToOptions): Promise<any>;
}
export declare class DirectionsCommon {
    static getFromToQuerystring(options: NavigateToOptions): string;
}
