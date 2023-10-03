import React from "react";
import { UserInterface } from "../interfaces/user-interface";
interface ProfileWidgetPropsInterface {
    user: UserInterface;
}
declare const ProfileWidget: ({ user }: ProfileWidgetPropsInterface) => React.JSX.Element;
export default ProfileWidget;
