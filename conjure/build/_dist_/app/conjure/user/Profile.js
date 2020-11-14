import{generateUUID as t}from"../../../../web_modules/@AssetSync/common.js";import a from"./services/ServiceManager.js";export default class r{constructor(e){this.conjure=e,this.isLoaded=!1,this.lastUpdated=0,this.profileData={},this.makeDefaultProfile(),this.serviceManager=new a(e)}makeDefaultProfile(){this.profileData={id:t(),username:"New User "+Math.round(Math.random()*1e4)}}getServiceManager(){return this.serviceManager}getProfile(){return this.profileData}getID(){return this.profileData.id}getUsername(){return this.profileData.username}setUsername(e){this.profileData.username=e}createProfile(){if(this.isLoaded)return;this.saveProfile(),this.setProfileLoaded(!0)}removeProfile(){if(!this.isLoaded)return;this.makeDefaultProfile(),this.setProfileLoaded(!1)}async loadFromDatabase(){let e=await this.conjure.profiles.get();if(!e||e.timestamp<this.lastUpdated||!e.data)return;this.lastUpdated=e.timestamp,e.data.profile&&this.setProfileFromDatabase(e.data.profile),e.data.services&&this.getServiceManager().setServicesFromDatabase(e.data.services)}saveProfile(){this.conjure.profiles.put({profile:this.profileData,services:this.getServiceManager().getServiceAsJson()})}setProfileFromDatabase(e){this.profileData=e,this.setProfileLoaded(!0),this.conjure.getGlobalHUD().log("Successfully loaded profile!")}setProfileLoaded(e){this.conjure.getScreens().screenProfile.setProfileLoaded(e),this.isLoaded=e,e&&this.conjure.getScreens().screenProfile.setProfileName(this.getUsername())}}