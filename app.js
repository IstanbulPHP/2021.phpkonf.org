const API_URL = 'https://cms.kommunity.com/api/events/phpkonf-2021?with[]=speakers&with[]=sessions&with[]=days&with[]=tracks&with[]=sponsorships&with[]=photos'

var App = new Vue({
    el: '#app',
    data: {
        days: [],
        speakers: [],
        sessions: [],
        sponsors: [],
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData: function () {
            axios.get(API_URL).then(response => {
                    const {days, speakers, sponsors} = response.data.data;
                    this.speakers = speakers;
                    this.sponsors = sponsors;
                    this.days = days
                    this.days[0].isSelected = true;
                    this.days[0].tracks[0].isSelected = true;
                    this.getAllSessions();
                    this.addSessionsForSpeakers();
                }
            );
        },
        getAllSessions: function () {
            this.days.forEach(day => {
                this.sessions = [...day.sessions, ...this.sessions]
            });
        },
        addSessionsForSpeakers: function () {
            this.speakers.forEach(speaker => {
                speaker.sessions = this.sessions.filter(session => {
                    if (session.speaker.id === speaker.id) {
                        return session;
                    }
                })
            });
        },
        getSortedSpeakers: function () {
            return _.sortBy(this.speakers, 'name')
        },
        getRandomSpeakers: function() {
            return _.sampleSize(this.speakers, 6);
        }
    }
});
