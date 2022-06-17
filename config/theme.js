// import { connect } from 'react-redux'
const themeKey = "credenc-marketplace-themekey"


const darkTheme = {
    defaultBackground : "#0A0A0A",
    subduedBackground: "#141414",
    disabledBackground: "#141414",
    inverseBackground: "#FFFFFF",
    defaultColor: "#DEDEDE",
    highContrastColor: "#FFFFFF",
    bodyColor:"#8F8F8F",
    disabledColor:"#4F4F4F",
    omniverseColor:"#4F4F4F",
    contrastStrokeColor:"#FFFFFF",
    defaultStrokeColor:"#4F4F4F",
    subduedStrokeColor:"#292929",
    insignificantStrokeColor:"#242424",
    defaultPrimaryColor:"#2D31D2",
    hoverPrimaryColor:"#575ADB",
    errorPrimaryColor:"#FD3217",
    successPrimaryColor:"#5FAE3A",
    greenGradientPrimaryColor:"#FF5794",
    greenGradientSecondaryColor:"#FFCC00",
    pinkGradientPrimaryColor:"#9900FF",
    pinkGradientSecondaryColor:"#FF0066",
}

const lightTheme = {
    defaultBackground : "#FFFFFF",
    subduedBackground: "#F7F7F7",
    disabledBackground: "#DDDDDD",
    inverseBackground: "#000000",
    defaultColor: "#222222",
    highContrastColor: "#000000",
    bodyColor:"#717171",
    disabledColor:"#B0B0B0",
    omniverseColor:"#FFFFFF",
    contrastStrokeColor:"#000000",
    defaultStrokeColor:"#B0B0B0",
    subduedStrokeColor:"#DDDDDD",
    insignificantStrokeColor:"#EBEBEB",
    defaultPrimaryColor:"#2D31D2",
    hoverPrimaryColor:"#575ADB",
    errorPrimaryColor:"#FD3217",
    successPrimaryColor:"#5FAE3A",
    greenGradientPrimaryColor:"#FF5794",
    greenGradientSecondaryColor:"#FFCC00",
    pinkGradientPrimaryColor:"#9900FF",
    pinkGradientSecondaryColor:"#FF0066",
}

export function ProjectTheme(theme){
 if(theme === "light"){
          return  lightTheme
        } else {
          return  darkTheme
        }
}





