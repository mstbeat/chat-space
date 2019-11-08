class UsersController < ApplicationController

  
  def index
    if params[:group_id].present?
      @group = Group.find(params[:group_id])
      @ids = @group.users.ids
      return nil if params[:keyword] == ""
      @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).where.not(id: @ids).limit(10)
    else
      @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    end
    respond_to do |format|
      format.html
      format.json
    end
  end
  
  def edit 
    
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :email)
    end
end
