(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('EditEventCtrl', EditEventCtrl);

	EditEventCtrl.$inject = ['Fire', '$routeParams', '$location', '$timeout'];

	function EditEventCtrl(Fire, $routeParams, $location, $timeout) {
		// controllerAs ViewModel
		var edit = this;

		// get the event ID
		var _eventId = $routeParams.eventId;

		// get events
		var events = Fire.events();

		// tabs
		edit.tabs = ['Update Details', 'Delete Event'];
		edit.currentTab = 0;

		/**
		 * Switch tabs
		 *
		 * @param index {number} tab index
		 */
		edit.changeTab = function(index) {
			edit.currentTab = index;
		};

		// synchronously retrieve user data
		edit.user = Fire.ref.getAuth();

		// get data from the database
		edit.data = Fire.data();

		/**
		 * Function for successful API call getting single event detail
		 *
		 * @param data {object} events data
		 * @private
		 */
		function _eventSuccess(data) {
			edit.editEvent = events.$getRecord(_eventId);
			edit.showEditForm = true;
		}
		events.$loaded(_eventSuccess);

		/**
		 * Reset the delete button to default state
		 *
		 * @private
		 */
		function _btnDeleteReset() {
			edit.btnDelete = false;
			edit.btnDeleteText = 'Delete Event';
		}

		_btnDeleteReset();

		/**
		 * Function returned on successful deletion of event
		 *
		 * @private
		 */
		function _deleteSuccess() {
			edit.btnDeleteText = 'Deleted!';
			edit.btnDelete = true;
			edit.editEvent = {};

			$timeout(function() {
				$location.path('/admin');
			}, 1500);
		}

		/**
		 * Function returned on error deleting event
		 *
		 * @private
		 */
		function _deleteError(error) {
			edit.btnDeleteText = 'Error deleting!';

			console.log('Error deleting event:', error);

			$timeout(_btnDeleteReset, 3000);
		}

		/**
		 * Delete the event
		 */
		edit.deleteEvent = function() {
			var rsvps = Fire.rsvps();

			edit.btnDeleteText = 'Deleting...';

			/**
			 * Delete all RSVPs associated with the deleted event
			 * Delete the event
			 *
			 * @private
			 */
			function _deleteRsvpsAndEvent() {
				angular.forEach(rsvps, function(rsvp) {
					if (rsvp.eventId === edit.editEvent.$id) {
						rsvps.$remove(rsvp);
					}
				});

				events.$remove(edit.editEvent).then(_deleteSuccess, _deleteError);
			}
			rsvps.$loaded().then(_deleteRsvpsAndEvent);
		};
	}
})();