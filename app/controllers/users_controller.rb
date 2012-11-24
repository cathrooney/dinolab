class UsersController < ApplicationController

	before_filter :find_user, only: [:show, :edit, :update]

  def show
  end

  def new
  	@user = User.new
  end

  def create
  	@user = User.new(params[:user])
  	if @user.save
  		session[:user_id] = @user.id

  		flash[:alert] = "You've signed up!"
  		redirect_to root_path
  	else
  		render "new"
  	end
  end

  def edit
  end

  def update
  end

  private

  def find_user
  	@user = User.find(params[:id])
  end
end
