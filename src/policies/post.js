const ApplicationPolicy = require ("./application");

module.exports = class PostPolicy extends ApplicationPolicy {
    new(){
        return this._isMember() || this._isAdmin(); 
    }

    create(){
        return this.new();
    }
    edit() {
        return this._isAdmin() || this._isOwner();

      }
    
    update() {
        return this.edit();
      }
    
    destroy() {
        return this.update();
      }
    


}