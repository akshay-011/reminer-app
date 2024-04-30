import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export function wp(x:number){
    return Math.floor(width * ( x / 100 ));
}

export function hp(x:number){
    return Math.floor( height * ( x / 100 ) );
}