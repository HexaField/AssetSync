import t from"./elements/ScreenElementButton.js";import s from"./ScreenBase.js";import r from"./elements/ScreenElementTextBox.js";import o from"./elements/ScreenElementLabelled.js";export default class h extends s{constructor(e,i){super(e,i);this.profile=this.conjure.getProfile(),this.updateProfile=this.updateProfile.bind(this),this.createProfile=this.createProfile.bind(this),this.openServices=this.openServices.bind(this),this.group.add(this.background),this.servicesButton=new t(this,this,{y:-this.height/2+.2,width:this.buttonWidth,height:this.buttonHeight}),this.servicesButton.setText("Services"),this.servicesButton.setOnClickCallback(this.openServices,0),this.registerElement(this.servicesButton),this.servicesButton.setHidden(!0),this.updateAccount=new t(this,this,{x:-.4,y:this.height/2-.2,width:this.buttonWidth,height:this.buttonHeight}),this.updateAccount.setText("Load Profile"),this.updateAccount.setOnClickCallback(this.updateProfile,0),this.registerElement(this.updateAccount),this.createProfileButton=new t(this,this,{x:.4,y:this.height/2-.2,width:this.buttonWidth,height:this.buttonHeight}),this.createProfileButton.setText("Create Profile"),this.createProfileButton.setOnClickCallback(this.createProfile),this.registerElement(this.createProfileButton),this.profileUsernameTextBox=new r(this,this,{width:this.buttonWidth,height:this.buttonHeight}),this.profileUsernameTextBox.setValue("username"),this.profileUsernameLabel=new o(this,this,{width:this.buttonWidth*2,height:this.buttonHeight,element:this.profileUsernameTextBox}),this.profileUsernameLabel.setText("Username: "),this.registerElement(this.profileUsernameLabel),this.profileUsernameLabel.setHidden(!0)}showScreen(e){super.showScreen(e)}update(e){super.update(e)}createProfile(){this.profile.isLoaded?this.profile.removeProfile():this.profile.createProfile()}openServices(){this.screenManager.showScreen(this.screenManager.screenServices)}setProfileLoaded(e){e?(this.updateAccount.setText("Save Profile"),this.createProfileButton.setText("Remove Profile"),this.profileUsernameLabel.setHidden(!1),this.servicesButton.setHidden(!1)):(this.updateAccount.setText("Load Profile"),this.createProfileButton.setText("Create Profile"),this.profileUsernameLabel.setHidden(!0),this.servicesButton.setHidden(!0))}updateProfile(){this.profile.isLoaded?(this.profile.setUsername(this.profileUsernameTextBox.getValue()),this.profile.saveProfile()):this.profile.loadFromDatabase()}setProfileName(e){this.profileUsernameTextBox.setValue(e)}}