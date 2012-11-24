class ListsController < ApplicationController

	before_filter :get_list, only: [:edit, :update, :destroy]


  def index
  	@lists = current_user.lists.all
  end

  def new
  	@list = current_user.lists.new
  end

  def create
  	@list = current_user.lists.new(params[:list])

  	if @list.save
  		flash[:alert] = "New list added"
  		redirect_to lists_path
  	else
  		render "new"
  	end
  end

  def edit
  end

  def update
  	if @list.update_attributes(params[:list])
  		flash[:alert] = "List updated!"
  		redirect_to lists_path
  	else
  		render "edit"
  	end
  end

  def destroy
  	@list.destroy
  	flash[:alert] = "List deleted!"
  	redirect_to lists_path
  end

  private

  def get_list
  	@list = current_user.lists.find(params[:id])
  end

end
