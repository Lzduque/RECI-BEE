class UsersController < ApplicationController

  def index

    name = params[:name]

    if name.blank?
      render status: 400, json: { error: 'Expected parameter `name`' }
    else
      render(
        status: 200,
        #User is name of model not table
        #When searching with curl: localhost:3001/api/users?name=test
        json: User.where(["name LIKE ?", "#{name}"]).first
      )
    end
  end




  #   def current_user
  #   @current_user ||= User.find(session[:user_id]) if session[:user_id]
  # end
  # helper_method :current_user