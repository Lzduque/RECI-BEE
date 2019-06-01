class MealPlansController < ApplicationController

  def index
    render json: MealPlan.all
  end

end
