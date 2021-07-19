import { Text } from "@ui-kitten/components";
import React from "react";
import ContentView from "../../layouts/breed/detail/index";
export const DetailBreed= ({navigation, route}) : React.ReactElement =>{
    return(<ContentView navigation={navigation} route={route}/>)
}