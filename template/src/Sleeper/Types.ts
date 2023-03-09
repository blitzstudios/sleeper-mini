export type Maybe<T> = T | null;
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Json: {[key: string]: any};
  List: string[];
  Map: {[key: string]: any};
  MapWithSnowflakeKey: {[key: string]: any};
  Set: string[];
  Snowflake: string;
  SnowflakeList: string[];
  SnowflakeSet: string[];
};

export type User = {
  __typename?: 'User';
  async_bundles?: Maybe<Scalars['List']>;
  avatar?: Maybe<Scalars['String']>;
  cookies?: Maybe<Scalars['Int']>;
  created?: Maybe<Scalars['Int']>;
  currencies?: Maybe<Scalars['Map']>;
  data_updated?: Maybe<Scalars['Map']>;
  deleted?: Maybe<Scalars['Int']>;
  display_name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  is_bot?: Maybe<Scalars['Boolean']>;
  metadata?: Maybe<Scalars['Json']>;
  notifications?: Maybe<Scalars['Map']>;
  pending?: Maybe<Scalars['Boolean']>;
  phone?: Maybe<Scalars['String']>;
  real_name?: Maybe<Scalars['String']>;
  solicitable?: Maybe<Scalars['Boolean']>;
  summoner_name?: Maybe<Scalars['String']>;
  summoner_region?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Snowflake']>;
  username?: Maybe<Scalars['String']>;
  verification?: Maybe<Scalars['String']>;
};

export type League = {
  __typename?: 'League';
  avatar?: Maybe<Scalars['String']>;
  company_id?: Maybe<Scalars['Snowflake']>;
  display_order?: Maybe<Scalars['Int']>;
  draft_id?: Maybe<Scalars['Snowflake']>;
  group_id?: Maybe<Scalars['Snowflake']>;
  last_author_avatar?: Maybe<Scalars['String']>;
  last_author_display_name?: Maybe<Scalars['String']>;
  last_author_id?: Maybe<Scalars['Snowflake']>;
  last_author_is_bot?: Maybe<Scalars['Boolean']>;
  last_message_attachment?: Maybe<Scalars['Json']>;
  last_message_id?: Maybe<Scalars['Snowflake']>;
  last_message_text?: Maybe<Scalars['String']>;
  last_message_text_map?: Maybe<Scalars['Json']>;
  last_message_time?: Maybe<Scalars['Int']>;
  last_pinned_message_id?: Maybe<Scalars['Snowflake']>;
  last_read_id?: Maybe<Scalars['Snowflake']>;
  last_transaction_id?: Maybe<Scalars['Snowflake']>;
  league_id?: Maybe<Scalars['Snowflake']>;
  matchup_legs?: Maybe<Scalars['List']>;
  metadata?: Maybe<Scalars['Map']>;
  name?: Maybe<Scalars['String']>;
  previous_league_id?: Maybe<Scalars['Snowflake']>;
  roster_positions?: Maybe<Scalars['List']>;
  scoring_settings?: Maybe<Scalars['Map']>;
  season?: Maybe<Scalars['String']>;
  season_type?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['Map']>;
  sport?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  total_rosters?: Maybe<Scalars['Int']>;
};

export type NavigationType =
  | 'DM'
  | 'INBOX'
  | 'MY_FEED'
  | 'FRIENDS'
  | 'LEAGUE'
  | 'ASYNC_SPORT'
  | 'CREATE_LEAGUE'
  | 'LEAGUE_SYNC'
  | 'DRAFTBOARDS'
  | 'SOLO_OVER_UNDER'
  | 'CHANNEL'
  | 'MANAGE_CHANNELS';

export type NavigationTypeId =
  | 1 // DRAFTBOARDS
  | 2 // CREATE_DM
  | 3 // DM_SCREEN
  | 4 // CREATE_LEAGUE
  | 5 // MY_FEED
  | 6 // MENTIONS
  | 7; // FRIENDS

export type Navigation = {
  selectedNavType: NavigationType;
  selectedNavTypeId: NavigationTypeId;
  selectedNavData: {};
};

export type Actions = {
  navigate: (navType?: NavigationType, navTypeId?: NavigationTypeId) => void;
};

export type Context = {
  user?: User;
  league?: League;
  navigation?: Navigation;
  actions?: Actions;
};
