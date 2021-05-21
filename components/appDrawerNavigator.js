import React from 'react'
import SettingsScreen from '../screens/settingsScreen'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './appTabNavigator'
import CustomMenu from './customSidebarMenu'
export const AppDrawerNavigator = createDrawerNavigator({
    home:{screen:AppTabNavigator},
setting:{
    screen:SettingsScreen
}},{contentComponent:CustomMenu},
    {initialRouteName:"home"
})