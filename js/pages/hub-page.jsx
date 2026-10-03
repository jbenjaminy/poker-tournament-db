var React = require('react');
var router = require('react-router');
var Link = router.Link;

function encodeSlug(name) {
  return String(name || '')
    .split(',').join('4')
    .split('&').join('$')
    .split(' ').join('_');
}

var HUBS = {
  'las-vegas-poker-rooms': {
    title: 'Las Vegas Poker Rooms & Casino Tournament Schedules | Daily Tourneys',
    h1: 'Las Vegas poker rooms and casino tournaments',
    intro: 'Browse Las Vegas and Henderson poker rooms with daily and weekly tournament schedules. Open a room for phone, hours, games, buy-ins, and start times — then jump to the schedule when we have one.',
    rooms: [
      { name: 'Bellagio Hotel & Casino', city: 'Las Vegas', state: 'NV' },
      { name: 'The Venetian', city: 'Las Vegas', state: 'NV' },
      { name: 'Aria Resort & Casino, Las Vegas', city: 'Las Vegas', state: 'NV' },
      { name: 'Wynn, Las Vegas', city: 'Las Vegas', state: 'NV' },
      { name: 'South Point Hotel, Casino & Spa', city: 'Las Vegas', state: 'NV' },
      { name: 'Red Rock Casino Resort & Spa', city: 'Las Vegas', state: 'NV' },
      { name: 'Green Valley Ranch Resort, Casino & Spa', city: 'Henderson', state: 'NV' },
      { name: 'The Orleans Hotel & Casino', city: 'Las Vegas', state: 'NV' }
    ]
  },
  'texas-poker-rooms': {
    title: 'Texas Poker Rooms & Casino Tournament Schedules | Daily Tourneys',
    h1: 'Texas poker rooms and casino tournaments',
    intro: 'Find Texas card houses, social clubs, and casino poker rooms across Houston, Dallas–Fort Worth, Austin, San Antonio, and beyond. Open a room for contact details, hours, games, and any posted daily or weekly schedule.',
    rooms: [
      { name: '101 Poker Club', city: 'Katy', state: 'TX' },
      { name: 'Alamo City Poker Club', city: 'San Antonio', state: 'TX' },
      { name: 'Amarillo Social Club', city: 'Amarillo', state: 'TX' },
      { name: 'Champions Club Texas', city: 'Houston', state: 'TX' },
      { name: 'Champions Social Club', city: 'Dallas', state: 'TX' },
      { name: 'Doghouse Poker Club', city: 'Cypress', state: 'TX' },
      { name: 'Empire Poker Club', city: 'Houston', state: 'TX' },
      { name: 'Kickapoo Lucky Eagle Casino & Hotel', city: 'Eagle Pass', state: 'TX' },
      { name: 'Lonestar Social Poker Club', city: 'Houston', state: 'TX' },
      { name: 'Palace Poker Texas', city: 'Grand Prairie', state: 'TX' },
      { name: 'Paramount Social Club', city: 'Houston', state: 'TX' },
      { name: 'Poker House Fort Worth', city: 'Burleson', state: 'TX' },
      { name: 'Prime Social Club', city: 'Houston', state: 'TX' },
      { name: 'SA Card House', city: 'San Antonio', state: 'TX' },
      { name: 'Shuffle 214', city: 'Dallas', state: 'TX' },
      { name: 'Shuffle 512', city: 'Austin', state: 'TX' },
      { name: 'Spades Poker House Baytown', city: 'Baytown', state: 'TX' },
      { name: 'Spades Poker House Webster', city: 'Webster', state: 'TX' },
      { name: 'TCH Social Austin', city: 'Austin', state: 'TX' },
      { name: 'TCH Social Las Colinas', city: 'Irving', state: 'TX' },
      { name: 'Texas Card House Dallas', city: 'Dallas', state: 'TX' },
      { name: 'Texas Card House Houston', city: 'Houston', state: 'TX' },
      { name: 'Texas Card House Rio Grande Valley', city: 'Edinburg', state: 'TX' },
      { name: 'Texas Card House Spring', city: 'Spring', state: 'TX' },
      { name: 'The Fort Card Room', city: 'Aledo', state: 'TX' },
      { name: 'The Hangar Poker House', city: 'Humble', state: 'TX' },
      { name: 'The Lodge Card Club Round Rock', city: 'Round Rock', state: 'TX' },
      { name: 'The Lodge Card Club San Antonio', city: 'San Antonio', state: 'TX' }
    ]
  },
  'california-poker-rooms': {
    title: 'California Poker Rooms & Casino Tournament Schedules | Daily Tourneys',
    h1: 'California poker rooms and casino tournaments',
    intro: 'Browse California cardrooms and casino poker rooms across Los Angeles, the Bay Area, San Diego, and beyond. Open a room for contact details, hours, games, and daily or weekly tournament schedules where published.',
    rooms: [
      { name: 'Ace & Vine', city: 'Napa', state: 'CA' },
      { name: 'Agua Caliente Casino, Palm Springs', city: '32-250 Bob Hope Drive Rancho Mirage', state: 'CA' },
      { name: 'Artichoke Joes Casino', city: 'San Bruno', state: 'CA' },
      { name: 'Bankers Casino', city: 'Salinas', state: 'CA' },
      { name: 'Barona Resort & Casino', city: 'Lakeside', state: 'CA' },
      { name: 'Bay 101', city: 'San Jose', state: 'CA' },
      { name: 'Bear River Casino Hotel', city: 'Loleta', state: 'CA' },
      { name: 'Black Oak Casino', city: 'Tuolumne', state: 'CA' },
      { name: 'Cache Creek Casino', city: 'Brooks', state: 'CA' },
      { name: 'California Grand Casino', city: 'Pacheco', state: 'CA' },
      { name: 'Capitol Casino', city: 'Sacramento', state: 'CA' },
      { name: 'Casino 99', city: 'Chico', state: 'CA' },
      { name: 'Casino Chico', city: 'Chico', state: 'CA' },
      { name: 'Casino Club', city: 'Redding', state: 'CA' },
      { name: 'Casino M8trix', city: 'San Jose', state: 'CA' },
      { name: 'Central Coast Casino', city: 'Grover Beach', state: 'CA' },
      { name: 'Club One Casino', city: 'Fresno', state: 'CA' },
      { name: 'Club San Rafael', city: 'San Rafael', state: 'CA' },
      { name: 'Commerce Casino', city: 'Commerce', state: 'CA' },
      { name: 'Crystal Casino', city: 'Compton', state: 'CA' },
      { name: 'Diamonds Jims Casino', city: 'Rosamond', state: 'CA' },
      { name: 'El Dorado Hills Casino', city: 'El Dorado Hills', state: 'CA' },
      { name: 'Empire Sportsmen Association', city: 'Modesto', state: 'CA' },
      { name: 'Garlic City Casino & Restaurant', city: 'Gilroy', state: 'CA' },
      { name: 'Golden West Casino', city: 'Bakersfield', state: 'CA' },
      { name: 'Graton Resort & Casino', city: 'Rohnert Park', state: 'CA' },
      { name: 'Hollywood Park Casino', city: 'Inglewood', state: 'CA' },
      { name: 'Hustler Casino', city: 'Gardena', state: 'CA' },
      { name: 'Isleton Casino', city: 'Isleton', state: 'CA' },
      { name: 'Kings Card Club', city: 'Stockton', state: 'CA' },
      { name: 'Lake Elsinore Hotel & Casino', city: 'Lake Elsinore', state: 'CA' },
      { name: 'Larry Flynt\'s Lucky Lady Casino', city: 'Gardena', state: 'CA' },
      { name: 'Limelight Cardroom', city: 'Sacramento', state: 'CA' },
      { name: 'Livermore Casino', city: 'Livermore', state: 'CA' },
      { name: 'Lucky Chances', city: 'Colma', state: 'CA' },
      { name: 'Merced Poker Room', city: 'Merced', state: 'CA' },
      { name: 'Napa Valley Casino', city: 'American Canyon', state: 'CA' },
      { name: 'Nineteenth Hole', city: 'Antioch', state: 'CA' },
      { name: 'North Coast Casino', city: 'Eureka', state: 'CA' },
      { name: 'Oaks Card Club', city: 'Emeryville', state: 'CA' },
      { name: 'Ocean\'s 11 Casino', city: 'Oceanside', state: 'CA' },
      { name: 'Oceanview Card Room', city: 'Santa Cruz', state: 'CA' },
      { name: 'Outlaws Card Parlour', city: 'Atascadero', state: 'CA' },
      { name: 'Palace Poker Casino', city: 'Hayward', state: 'CA' },
      { name: 'Parkwest Casino 580', city: 'Livermore', state: 'CA' },
      { name: 'Parkwest Casino Cordova', city: 'Rancho Cordova', state: 'CA' },
      { name: 'Parkwest Casino Lodi', city: 'Lodi', state: 'CA' },
      { name: 'Parkwest Casino Lotus', city: 'Sacramento', state: 'CA' },
      { name: 'Parkwest Casino Manteca', city: 'Manteca', state: 'CA' },
      { name: 'Players Casino', city: 'Ventura', state: 'CA' },
      { name: 'Seven Mile Casino', city: 'Chula Vista', state: 'CA' },
      { name: 'Stars Casino', city: 'Tracy', state: 'CA' },
      { name: 'Stones Gambling Hall', city: 'Citrus Heights', state: 'CA' },
      { name: 'Sycuan Casino', city: 'El Cajon', state: 'CA' },
      { name: 'The Aviator Casino', city: 'Delano', state: 'CA' },
      { name: 'The Bicycle Hotel & Casino', city: 'Bell Gardens', state: 'CA' },
      { name: 'The Clovis 500 Club', city: 'Clovis', state: 'CA' },
      { name: 'The Gardens Casino', city: 'Hawaiian Gardens', state: 'CA' },
      { name: 'The Marina Club Casino', city: 'Marina', state: 'CA' },
      { name: 'Thunder Valley Casino', city: 'Lincoln', state: 'CA' },
      { name: 'Towers Casino & Card Room', city: 'Grass Valley', state: 'CA' },
      { name: 'Turlock Poker Room', city: 'Turlock', state: 'CA' },
      { name: 'Westlane Card Room', city: 'Stockton', state: 'CA' }
    ]
  },
  'washington-poker-rooms': {
    title: 'Washington Poker Rooms & Casino Tournament Schedules | Daily Tourneys',
    h1: 'Washington poker rooms and casino tournaments',
    intro: 'Find Washington commercial card rooms and casino poker rooms across the Seattle area, Tacoma, Spokane, and beyond. Open a room for contact details, hours, games, and regular tournament schedules where published.',
    rooms: [
      { name: 'Ace\'s Poker Tukwila', city: 'Tukwila', state: 'WA' },
      { name: 'All Star Casino', city: 'Silverdale', state: 'WA' },
      { name: 'Black Pearl Restaurant & Card Room', city: 'Spokane Valley', state: 'WA' },
      { name: 'Buzz Inn Steakhouse East Wenatchee', city: 'East Wenatchee', state: 'WA' },
      { name: 'Caribbean Cardroom', city: 'Kirkland', state: 'WA' },
      { name: 'Casino Caribbean Kirkland', city: 'Kirkland', state: 'WA' },
      { name: 'Casino Caribbean Yakima', city: 'Yakima', state: 'WA' },
      { name: 'Chips Casino Lakewood', city: 'Lakewood', state: 'WA' },
      { name: 'Clearwater Saloon & Casino', city: 'East Wenatchee', state: 'WA' },
      { name: 'Coyote Bob\'s Casino', city: 'Kennewick', state: 'WA' },
      { name: 'Crazy Moose Casino II', city: 'Mountlake Terrace', state: 'WA' },
      { name: 'Crazy Moose Casino Pasco', city: 'Pasco', state: 'WA' },
      { name: 'Fortune Casino La Center', city: 'La Center', state: 'WA' },
      { name: 'Fortune Casino Lacey', city: 'Lacey', state: 'WA' },
      { name: 'Fortune Casino Renton', city: 'Renton', state: 'WA' },
      { name: 'Fortune Casino Shoreline', city: 'Shoreline', state: 'WA' },
      { name: 'Fortune Casino Tukwila', city: 'Tukwila', state: 'WA' },
      { name: 'Grand Casino Renton', city: 'Renton', state: 'WA' },
      { name: 'Grand Casino Shoreline', city: 'Shoreline', state: 'WA' },
      { name: 'Great American Casino Everett', city: 'Everett', state: 'WA' },
      { name: 'Great American Casino Tukwila', city: 'Tukwila', state: 'WA' },
      { name: 'Imperial Palace Casino Auburn', city: 'Auburn', state: 'WA' },
      { name: 'Imperial Palace Casino Seattle', city: 'Seattle', state: 'WA' },
      { name: 'Imperial Palace Casino Tukwila', city: 'Tukwila', state: 'WA' },
      { name: 'Jamestown Saloon', city: 'Arlington', state: 'WA' },
      { name: 'Joker\'s Casino and Sports Bar', city: 'Richland', state: 'WA' },
      { name: 'Lancer Lanes and Casino', city: 'Clarkston', state: 'WA' },
      { name: 'Lilac Lanes & Casino', city: 'Spokane', state: 'WA' },
      { name: 'Little Creek Casino Resort', city: 'Shelton', state: 'WA' },
      { name: 'Macau Casino Lakewood', city: 'Lakewood', state: 'WA' },
      { name: 'Macau Casino Tukwila', city: 'Tukwila', state: 'WA' },
      { name: 'New Phoenix', city: 'La Center', state: 'WA' },
      { name: 'Nob Hill Casino', city: 'Yakima', state: 'WA' },
      { name: 'Northern Quest Resort & Casino', city: 'Airway Heights', state: 'WA' },
      { name: 'Palace Casino Lakewood', city: 'Lakewood', state: 'WA' },
      { name: 'Papas Casino Restaurant & Lounge', city: 'Moses Lake', state: 'WA' },
      { name: 'Riverside Casino', city: 'Tukwila', state: 'WA' },
      { name: 'Roman Casino', city: 'Seattle', state: 'WA' },
      { name: 'Silver Dollar Casino Mill Creek', city: 'Bothell', state: 'WA' },
      { name: 'Silver Dollar Casino SeaTac', city: 'SeaTac', state: 'WA' },
      { name: 'Slo Pitch Pub & Eatery', city: 'Bellingham', state: 'WA' }
    ]
  },
  'florida-poker-rooms': {
    title: 'Florida Poker Rooms & Casino Tournament Schedules | Daily Tourneys',
    h1: 'Florida poker rooms and casino tournaments',
    intro: 'Find Florida poker rooms and casino tournament schedules across Jacksonville, Miami, Tampa Bay, Orlando, and beyond. Open a room for contact details, hours, games, and daily or weekly schedules where published.',
    rooms: [
      { name: 'Bestbet, Orange Park', city: 'Orange Park', state: 'FL' },
      { name: 'Calder Casino', city: 'Miami Gardens', state: 'FL' },
      { name: 'Casino Miami', city: 'Miami', state: 'FL' },
      { name: 'Club 52 Poker at Melbourne Greyhound Park', city: 'Melbourne', state: 'FL' },
      { name: 'Creek Entertainment Gretna', city: 'Gretna', state: 'FL' },
      { name: 'Daytona Beach Kennel Club & Poker Room, International Speedway', city: 'Daytona Beach', state: 'FL' },
      { name: 'Daytona Beach Kennel Club & Poker Room, Williamson Blvd', city: 'Daytona Beach', state: 'FL' },
      { name: 'Derby Lane Poker Room', city: 'St. Petersburg', state: 'FL' },
      { name: 'Ebro Poker Room', city: 'Ebro', state: 'FL' },
      { name: 'Fort Pierce Poker &  Jai-Alai', city: 'Fort Pierce', state: 'FL' },
      { name: 'Gulfstream Park Racing & Casino', city: 'Hallandale Beach', state: 'FL' },
      { name: 'Harrah\'s Pompano Beach', city: 'Pompano Beach', state: 'FL' },
      { name: 'Hialeah Park Casino', city: 'Hialeah', state: 'FL' },
      { name: 'Lucky\'s Card Room (TGT Poker)', city: 'Tampa', state: 'FL' },
      { name: 'Magic City Casino', city: 'Miami', state: 'FL' },
      { name: 'Miccosukee Resort & Gaming', city: 'Miami', state: 'FL' },
      { name: 'Naples Fort Myers Kennel Club & Poker Room', city: 'Bonita Springs', state: 'FL' },
      { name: 'Ocala Bets', city: 'Ocala', state: 'FL' },
      { name: 'Ocala Poker & Jai-Alai', city: 'Orange Lake', state: 'FL' },
      { name: 'One-Eyed Jack\'s Poker Room', city: 'Sarasota', state: 'FL' },
      { name: 'Orange City Racing and Card Club', city: 'Orange City', state: 'FL' },
      { name: 'Oxford Downs', city: 'Summerfield', state: 'FL' },
      { name: 'Palm Beach Kennel Club, West Palm Beach', city: 'West Palm Beach', state: 'FL' },
      { name: 'Pensacola Greyhound Park Poker Room', city: 'Pensacola', state: 'FL' },
      { name: 'Seminole Casino Hotel, Immokalee', city: 'Immokalee', state: 'FL' },
      { name: 'Seminole Casino, Coconut Creek', city: 'Coconut Creek', state: 'FL' },
      { name: 'Seminole Classic Casino, Hollywood', city: 'Hollywood', state: 'FL' },
      { name: 'Seminole Hard Rock Hotel & Casino, Hollywood', city: 'Hollywood', state: 'FL' },
      { name: 'Seminole Hard Rock Hotel & Casino, Tampa', city: 'Tampa', state: 'FL' },
      { name: 'Tampa Bay Downs', city: 'Tampa', state: 'FL' },
      { name: 'The Big Easy Casino', city: 'Hallandale Beach', state: 'FL' },
      { name: 'The Casino @ Dania Beach', city: 'Dania Beach', state: 'FL' },
      { name: 'bestbet Jacksonville', city: 'Jacksonville', state: 'FL' },
      { name: 'bestbet St. Augustine', city: 'St. Augustine', state: 'FL' }
    ]
  }
};

var HubPage = React.createClass({
  componentDidMount: function() {
    this.setDocTitle();
  },
  componentDidUpdate: function(prevProps) {
    if (!prevProps.params || !this.props.params) { return; }
    if (prevProps.params.slug !== this.props.params.slug) {
      this.setDocTitle();
    }
  },
  componentWillUnmount: function() {
    document.title = 'Daily Tourneys | U.S. Casino & Poker Room Tournament Schedules';
  },
  setDocTitle: function() {
    var hub = this.getHub();
    if (hub && hub.title) {
      document.title = hub.title;
    } else {
      document.title = 'Poker Rooms & Casino Tournament Schedules | Daily Tourneys';
    }
  },
  getHub: function() {
    var slug = this.props.params && this.props.params.slug;
    if (!slug && this.props.location) {
      var path = this.props.location.pathname || '';
      var dedicated = [
        'texas-poker-rooms',
        'california-poker-rooms',
        'washington-poker-rooms',
        'florida-poker-rooms'
      ];
      for (var i = 0; i < dedicated.length; i++) {
        if (path.indexOf(dedicated[i]) !== -1) {
          slug = dedicated[i];
          break;
        }
      }
    }
    return HUBS[slug] || null;
  },
  render: function() {
    var hub = this.getHub();
    var slug = this.props.params && this.props.params.slug;

    if (!hub) {
      return (
        <div className="content-page hub-page">
          <div className="detail-toolbar">
            <Link to="/allcasinos" className="back-link">← Back to search</Link>
          </div>
          <h1 className="content-h1">Hub not found</h1>
          <p className="content-lead">No hub content is mapped for “{slug}”. Try Las Vegas or Texas, or search all rooms.</p>
          <p className="content-cta">
            <Link to="/hubs/las-vegas-poker-rooms">Las Vegas poker rooms</Link>
            {' · '}
            <Link to="/texas-poker-rooms">Texas poker rooms</Link>
            {' · '}
            <Link to="/allcasinos">Search all casinos</Link>
          </p>
        </div>
      );
    }

    var rooms = hub.rooms.map(function(room) {
      var roomSlug = encodeSlug(room.name);
      var meta = room.city + ', ' + room.state;
      return (
        <li className="hub-card" key={room.name}>
          <Link to={'/allcasinos/' + roomSlug}>
            <span className="casino-result-name">{room.name}</span>
            <span className="casino-result-meta">{meta}</span>
          </Link>
        </li>
      );
    });

    return (
      <div className="content-page hub-page">
        <div className="detail-toolbar">
          <Link to="/allcasinos" className="back-link">← Back to search</Link>
        </div>
        <h1 className="content-h1">{hub.h1}</h1>
        <p className="content-lead">{hub.intro}</p>
        <ul className="hub-grid">
          {rooms}
        </ul>
        <p className="content-cta">
          Looking for another city? <Link to="/allcasinos">Search all U.S. poker rooms</Link>
        </p>
      </div>
    );
  }
});

module.exports = HubPage;
