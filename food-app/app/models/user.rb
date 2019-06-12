class User < ActiveRecord::Base
  has_many :books
  has_many :recipes, :through => :books
  has_many :meal_plans

  validates :name, presence: true
end
