import ScreenElementButton from './elements/ScreenElementButton';
import ScreenBase from './ScreenBase'
import ScreenElementTextBox from './elements/ScreenElementTextBox';
import ScreenElementLabelled from './elements/ScreenElementLabelled';

export default class ScreenProfile extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args);
        
        this.profile = this.conjure.getProfile();

        this.updateProfile = this.updateProfile.bind(this)
        this.createProfile = this.createProfile.bind(this);
        this.openServices = this.openServices.bind(this);

        this.group.add(this.background);
        
        this.servicesButton = new ScreenElementButton(this, this, { y: -this.height / 2 + 0.2, width: this.buttonWidth, height: this.buttonHeight });
        this.servicesButton.setText('Services');
        this.servicesButton.setOnClickCallback(this.openServices, 0);
        this.registerElement(this.servicesButton);
        this.servicesButton.setHidden(true)
        
        this.updateAccount = new ScreenElementButton(this, this, { x: -0.4, y: this.height / 2 - 0.2, width: this.buttonWidth, height: this.buttonHeight });
        this.updateAccount.setText('Load Profile');
        this.updateAccount.setOnClickCallback(this.updateProfile, 0);
        this.registerElement(this.updateAccount);
        
        this.createProfileButton = new ScreenElementButton(this, this, { x: 0.4, y: this.height / 2 - 0.2, width: this.buttonWidth, height: this.buttonHeight });
        this.createProfileButton.setText('Create Profile');
        this.createProfileButton.setOnClickCallback(this.createProfile);
        this.registerElement(this.createProfileButton);
        
        this.profileUsernameTextBox = new ScreenElementTextBox(this, this, { width: this.buttonWidth, height: this.buttonHeight })
        this.profileUsernameTextBox.setValue('username')
        // this.profileUsernameTextBox.setHidden(true);
        // this.profileUsernameTextBox.setOnExitCallback(this.updateName)
        this.profileUsernameLabel = new ScreenElementLabelled(this, this, { width: this.buttonWidth * 2, height: this.buttonHeight, element: this.profileUsernameTextBox })
        this.profileUsernameLabel.setText('Username: ')
        this.registerElement(this.profileUsernameLabel)
        this.profileUsernameLabel.setHidden(true)

        // this.profileUsernameLabel.group.position.set( -0.6, 0, 0.1);
        
        // this.discordNameLabel = new easyText3D(screenManager.conjure, this.group, 'Discord Name:', {anchorX: 'right'});
        // this.discordNameLabel.group.position.set( -0.6, 0.2, 0.1);

        // this.discordName = new easyText3D(screenManager.conjure, this.group, '-not logged in-', {anchorX: 'left'});
        // this.discordName.group.position.set( -0.5, 0.2, 0.1);
        
        // this.avatarPreview = new User(screenManager.conjure, screenManager.conjure.scene, camera, true);
        // this.avatarPreview.group.position.set(1, -0.8, 0);
        // this.group.add(this.avatarPreview.group);
    }

    showScreen(active)
    {
        super.showScreen(active);
    }

    update(updateArgs)
    {
        super.update(updateArgs);
        // this.avatarPreview.mesh.rotation.y += 0.01;
    }
    
    createProfile()
    {
        if(this.profile.isLoaded)
            this.profile.removeProfile()
        else
            this.profile.createProfile()

    }

    openServices()
    {
        this.screenManager.showScreen(this.screenManager.screenServices)
    }

    setProfileLoaded(loaded)
    {
        if(loaded)
        {
            this.updateAccount.setText('Save Profile')
            this.createProfileButton.setText('Remove Profile')
            this.profileUsernameLabel.setHidden(false)
            this.servicesButton.setHidden(false)
        }
        else
        {
            this.updateAccount.setText('Load Profile')
            this.createProfileButton.setText('Create Profile')
            this.profileUsernameLabel.setHidden(true)
            this.servicesButton.setHidden(true)
        }
    }

    updateProfile()
    {
        if(this.profile.isLoaded)
        {
            this.profile.setUsername(this.profileUsernameTextBox.getValue());
            this.profile.saveProfile()
        }
        else
            this.profile.loadFromDatabase()
    }

    setProfileName(name)
    {
        this.profileUsernameTextBox.setValue(name);
    }
}