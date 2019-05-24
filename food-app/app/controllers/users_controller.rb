class UsersController < ApplicationController

  def index

    name = params[:name]

    if name.blank?
      render status: 400, json: { error: 'Expected parameter `name`' }
    else
      render(
        status: 200,
        json: User.where(["name LIKE ?", "#{name}"]).limit(1)
      )
    end
  end
end