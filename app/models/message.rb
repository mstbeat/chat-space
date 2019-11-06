class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :content, presence: true, unless: :image?

  mount_uploader :image, ImageUploader

  def created_at
    attributes['created_at'].strftime("%Y/%m/%d(%a) %H:%M:%S")
  end
end
