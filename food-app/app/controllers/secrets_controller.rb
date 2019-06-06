class SecretsController < ApplicationController

  def index
    render json: Secret.all
  end
end