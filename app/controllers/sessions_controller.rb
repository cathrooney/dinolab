class SessionsController < ApplicationController
  def new
  end

  def create
  	@user = User.login(params[:sessions][:username], params[:sessions][:password])
  	if @user.present?
  		flash[:alert] = "Yay, you signed in"
  		session[:user_id] = @user.id
  		redirect_to root_path
  	else
  		flash[:error] = "Invalid email or password"
  		render "new"
  	end
  end

  def destroy
  	reset_session
  	flash[:alert] = "Logged out!"
  	redirect_to root_path
  end
end
