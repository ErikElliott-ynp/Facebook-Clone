class Api::FriendRequestsController < ApplicationController
    def index 
        @incoming = FriendRequest.where(friend: current_user)
        @outgoing = current_user.friend_requests
    end

    def create
        id = params.dig(:friend_request, :friend_id)
        @friend_request = FriendRequest.new(friend_id: id) 
        @friend_request.user_id = current_user.id
        if @friend_request.save 
            render :show
        else
            render json: @friend_request.errors.full_messages, status: 422
        end
    end

    def update
        id = params.dig(:id)
       @friend_request = FriendRequest.find(id)
       if @friend_request.accept
            @friendship = Friendship.where("user_id = ? AND friend_id = ?", @friend_request.user_id, @friend_request.friend_id)
            @other_side = Friendship.where("user_id = ? AND friend_id = ?", @friend_request.friend_id, @friend_request.user_id)
            render :show
        else
            render json: @friend_request.errors.full_messages
        end
    end

    def destroy
        id = params.dig(:id)
        @friend_request = FriendRequest.find(id)
        if @friend_request.destroy
            render json: {}
        else
            render @friend_request.errors.full_messages, status: 422
        end
    end

end
