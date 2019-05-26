class Ingredient < ActiveRecord::Base

<<<<<<< HEAD

=======
  has_many :quantities
  has_many :recipes, :through => :quantities
>>>>>>> origin/master

end
