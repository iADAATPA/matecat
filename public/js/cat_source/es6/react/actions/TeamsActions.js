let AppDispatcher = require('../dispatcher/AppDispatcher');
let TeamConstants = require('../constants/TeamConstants');


let TeamsActions = {

    renderTeams: function (teams, defaultTeam) {
        AppDispatcher.dispatch({
            actionType: TeamConstants.RENDER_TEAMS,
            teams: teams,
            defaultTeam: defaultTeam
        });
    },

    createTeam: function (teamName, members) {
        let team;
        let self = this;
        return API.TEAM.createTeam(teamName, members).done(function (response) {
            team = response.team;
            AppDispatcher.dispatch({
                actionType: TeamConstants.ADD_TEAM,
                team: team
            });
        });
    },

    updateTeam: function (team) {
        API.TEAM.getTeamMembers(team.id).then(function (data) {
            team.members = data.members;
            team.pending_invitations = data.pending_invitations;
            AppDispatcher.dispatch({
                actionType: TeamConstants.UPDATE_TEAM,
                team: team
            });
        });
    },

    updateTeams: function (teams) {
        AppDispatcher.dispatch({
            actionType: TeamConstants.UPDATE_TEAMS,
            teams: teams
        });
    },

    getAllTeams: function () {
        API.TEAM.getAllTeams(true).done(function (data) {
            AppDispatcher.dispatch({
                actionType: TeamConstants.RENDER_TEAMS,
                teams: data.teams,
            });
        });
    },

    selectTeam: function (team) {
        AppDispatcher.dispatch({
            actionType: TeamConstants.UPDATE_TEAM,
            team: team
        });
        AppDispatcher.dispatch({
            actionType: TeamConstants.CHOOSE_TEAM,
            teamId: team.id
        });
    },

    changeTeamFromUploadPage: function (team) {
        $('.reloading-upload-page').show();
        APP.setTeamInStorage(team.id);
        AppDispatcher.dispatch({
            actionType: TeamConstants.CHOOSE_TEAM,
            teamId: team.id
        });
        setTimeout(function () {
            $('.reloading-upload-page').hide();
        }, 1000)
    },

};

module.exports = TeamsActions;
