import { DirectionsApi, DirectionsCommon, NavigateToOptions } from "./directions.common";
export declare class Directions extends DirectionsCommon implements DirectionsApi {
    private isPackageInstalled();
    available(): Promise<any>;
    navigate(options: NavigateToOptions): Promise<any>;
}
