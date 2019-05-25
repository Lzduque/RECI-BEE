class User < ActiveRecord::Base

  has_many :books
  has_many :recipes, :through => :books

  validates :name, presence: true

end
