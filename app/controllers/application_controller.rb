class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method :current_user, :current_user?

  def current_user
  	if session[:user_id].present?
  		@current_user = User.find(session[:user_id])
  	else
  		@current_user = nil
  	end
  end

  def current_user?
  	current_user != nil
  end
end
