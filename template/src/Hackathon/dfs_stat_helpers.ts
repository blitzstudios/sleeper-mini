export type WagerTypeInfo = {
  enabled: boolean;
  label: string;
  label_short: string;
  stat_key: string;
};

const DFS_AVAILABLE_WAGER_TYPE_BY_SPORT_MAP: {
  [key: string]: {[key: string]: WagerTypeInfo};
} = {
  nfl: {
    passing_yards: {
      enabled: true,
      label: 'Passing Yards',
      label_short: 'PASS YD',
      stat_key: 'pass_yd',
    },
    receiving_yards: {
      enabled: true,
      label: 'Receiving Yards',
      label_short: 'REC YD',
      stat_key: 'rec_yd',
    },
    rushing_yards: {
      enabled: true,
      label: 'Rushing Yards',
      label_short: 'RUSH YD',
      stat_key: 'rush_yd',
    },
    passing_touchdowns: {
      enabled: true,
      label: 'Passing TDs',
      label_short: 'PASS TD',
      stat_key: 'pass_td',
    },
    receiving_touchdowns: {
      enabled: true,
      label: 'Receiving TDs',
      label_short: 'REC TD',
      stat_key: 'rec_td',
    },
    rushing_touchdowns: {
      enabled: true,
      label: 'Rushing TDs',
      label_short: 'RUSH TD',
      stat_key: 'rush_td',
    },
    pass_completions: {
      enabled: true,
      label: 'Completions',
      label_short: 'COMP',
      stat_key: 'pass_cmp',
    },
    receptions: {
      enabled: true,
      label: 'Receptions',
      label_short: 'REC',
      stat_key: 'rec',
    },
    interceptions: {
      enabled: true,
      label: 'Interceptions',
      label_short: 'INT',
      stat_key: 'pass_int',
    },
    field_goal_made: {
      enabled: true,
      label: 'FGM',
      label_short: 'FGM',
      stat_key: 'fgm',
    },
    extra_point_made: {
      enabled: true,
      label: 'XPM',
      label_short: 'XPM',
      stat_key: 'xpm',
    },
    kicking_points: {
      enabled: true,
      label: 'Kick Pts',
      label_short: 'KICK PTS',
      stat_key: 'kick_pts',
    },
    passing_and_rushing_yards: {
      enabled: true,
      label: 'Pass + Rush Yards',
      label_short: 'PASS+RUSH YD',
      stat_key: 'pass_rush_yd',
    },
    rushing_and_receiving_yards: {
      enabled: true,
      label: 'Rush + Rec Yards',
      label_short: 'RUSH+REC YD',
      stat_key: 'rush_rec_yd',
    },
    fantasy_points: {
      enabled: true,
      label: 'Fantasy Points',
      label_short: 'FPTS',
      stat_key: 'pts_ppr',
    },
    // note: this will be removed in the future in favor of fantasy_points
    fantasy_points_ppr: {
      enabled: true,
      label: 'Fantasy Points',
      label_short: 'FPTS',
      stat_key: 'pts_ppr',
    },
  },
  cfb: {
    passing_yards: {
      enabled: true,
      label: 'Passing Yards',
      label_short: 'PASS YD',
      stat_key: 'pass_yd',
    },
    receiving_yards: {
      enabled: true,
      label: 'Receiving Yards',
      label_short: 'REC YD',
      stat_key: 'rec_yd',
    },
    rushing_yards: {
      enabled: true,
      label: 'Rushing Yards',
      label_short: 'RUSH YD',
      stat_key: 'rush_yd',
    },
    passing_touchdowns: {
      enabled: true,
      label: 'Passing TDs',
      label_short: 'PASS TD',
      stat_key: 'pass_td',
    },
    receiving_touchdowns: {
      enabled: true,
      label: 'Receiving TDs',
      label_short: 'REC TD',
      stat_key: 'rec_td',
    },
    rushing_touchdowns: {
      enabled: true,
      label: 'Rushing TDs',
      label_short: 'RUSH TD',
      stat_key: 'rush_td',
    },
    interceptions: {
      enabled: true,
      label: 'Interceptions',
      label_short: 'INT',
      stat_key: 'pass_int',
    },
  },
  nba: {
    points: {
      enabled: true,
      label: 'Points',
      label_short: 'PTS',
      stat_key: 'pts',
    },
    rebounds: {
      enabled: true,
      label: 'Rebounds',
      label_short: 'REB',
      stat_key: 'reb',
    },
    assists: {
      enabled: true,
      label: 'Assists',
      label_short: 'AST',
      stat_key: 'ast',
    },
    steals: {
      enabled: true,
      label: 'Steals',
      label_short: 'STL',
      stat_key: 'stl',
    },
    blocks: {
      enabled: true,
      label: 'Blocks',
      label_short: 'BLK',
      stat_key: 'blk',
    },
    threes_made: {
      enabled: true,
      label: 'Three Pointers',
      label_short: '3PM',
      stat_key: 'tpm',
    },
    turnovers: {
      enabled: true,
      label: 'Turnovers',
      label_short: 'TO',
      stat_key: 'to',
    },
    pts_reb_ast: {
      enabled: true,
      label: 'Pts + Reb + Ast',
      label_short: 'P+R+A',
      stat_key: 'pts_reb_ast',
    },
    double_double: {
      enabled: true,
      label: 'Double Double',
      label_short: 'DBL DBL',
      stat_key: 'dd',
    },
    triple_double: {
      enabled: true,
      label: 'Triple Double',
      label_short: 'TRPL DBL',
      stat_key: 'td',
    },
    points_and_assists: {
      enabled: true,
      label: 'Points + Assists',
      label_short: 'PTS + AST',
      stat_key: 'pts_ast',
    },
    points_and_rebounds: {
      enabled: true,
      label: 'Points + Rebounds',
      label_short: 'PTS + REB',
      stat_key: 'pts_reb',
    },
    rebounds_and_assists: {
      enabled: true,
      label: 'Assists + Rebounds',
      label_short: 'AST + REB',
      stat_key: 'reb_ast',
    },
    first_qtr_points: {
      enabled: true,
      label: '1st Quarter Points',
      label_short: '1Q PTS',
      stat_key: 'q1_pts',
    },
    first_qtr_assists: {
      enabled: true,
      label: '1st Quarter Assists',
      label_short: '1Q AST',
      stat_key: 'q1_ast',
    },
    first_qtr_rebounds: {
      enabled: true,
      label: '1st Quarter Rebounds',
      label_short: '1Q REB',
      stat_key: 'q1_reb',
    },
    blocks_and_steals: {
      enabled: true,
      label: 'Steals + Blocks',
      label_short: 'STL + BLK',
      stat_key: 'blk_stl',
    },
    fantasy_points: {
      enabled: true,
      label: 'Fantasy Points',
      label_short: 'FPTS',
      stat_key: 'pts_std_dfs',
    },
  },
  cbb: {
    points: {
      enabled: true,
      label: 'Points',
      label_short: 'PTS',
      stat_key: 'pts',
    },
    assists: {
      enabled: true,
      label: 'Assists',
      label_short: 'AST',
      stat_key: 'ast',
    },
    rebounds: {
      enabled: true,
      label: 'Rebounds',
      label_short: 'REB',
      stat_key: 'reb',
    },
    threes_made: {
      enabled: true,
      label: 'Three Pointers',
      label_short: '3PM',
      stat_key: 'tpm',
    },
    pts_reb_ast: {
      enabled: true,
      label: 'Pts + Reb + Ast',
      label_short: 'P+R+A',
      stat_key: 'pts_reb_ast',
    },
  },
  mlb: {
    strike_outs: {
      enabled: true,
      label: 'Strikeouts',
      label_short: 'K',
      stat_key: 'p_strike_outs',
    },
    hits_allowed: {
      enabled: true,
      label: 'Hits Allowed',
      label_short: 'HA',
      stat_key: 'hits_allowed',
    },
    earned_runs: {
      enabled: true,
      label: 'Earned Runs',
      label_short: 'ER',
      stat_key: 'earned_runs',
    },
    outs: {
      enabled: true,
      label: 'Outs',
      label_short: 'OUTS',
      stat_key: 'p_outs',
    },
    walks: {
      enabled: true,
      label: 'Walks',
      label_short: 'P BB',
      stat_key: 'walks',
    },
    singles: {
      enabled: true,
      label: 'Singles',
      label_short: '1B',
      stat_key: 'singles',
    },
    total_bases: {
      enabled: true,
      label: 'Total Bases',
      label_short: 'BASES',
      stat_key: 'total_bases',
    },
    hits: {
      enabled: true,
      label: 'Hits',
      label_short: 'HITS',
      stat_key: 'hits',
    },
    runs: {
      enabled: true,
      label: 'Runs',
      label_short: 'RUNS',
      stat_key: 'runs',
    },
    rbis: {
      enabled: true,
      label: 'RBI',
      label_short: 'RBI',
      stat_key: 'rbis',
    },
    hits_runs_rbis: {
      enabled: true,
      label: 'Hit + Run + RBI',
      label_short: 'HIT+RUN+RBI',
      stat_key: 'hits_runs_rbis',
    },
    doubles: {
      enabled: true,
      label: 'Doubles',
      label_short: '2B',
      stat_key: 'doubles',
    },
    triples: {
      enabled: true,
      label: 'Triples',
      label_short: '3B',
      stat_key: 'triples',
    },
    home_runs: {
      enabled: true,
      label: 'Home Runs',
      label_short: 'HR',
      stat_key: 'home_runs',
    },
    stolen_bases: {
      enabled: true,
      label: 'Stolen Bases',
      label_short: 'SB',
      stat_key: 'stolen_bases',
    },
    bat_walks: {
      enabled: true,
      label: 'Batter Walks',
      label_short: 'BB',
      stat_key: 'b_walks',
    },
    bat_strike_outs: {
      enabled: true,
      label: 'Batter Strikeouts',
      label_short: 'SO',
      stat_key: 'b_strike_outs',
    },
  },
  nhl: {
    goals_against: {
      enabled: true,
      label: 'Goals Against',
      label_short: 'GA',
      stat_key: 'goalie_goals_against',
    },
    saves: {
      enabled: true,
      label: 'Saves',
      label_short: 'SV',
      stat_key: 'goalie_saves',
    },
    shutouts: {
      enabled: true,
      label: 'Shutouts',
      label_short: 'SO',
      stat_key: 'goalie_shutouts',
    },
    goals: {
      enabled: true,
      label: 'Goals',
      label_short: 'G',
      stat_key: 'goals',
    },
    assists: {
      enabled: true,
      label: 'Assists',
      label_short: 'A',
      stat_key: 'assists',
    },
    shots: {
      enabled: true,
      label: 'Shots On Goal',
      label_short: 'SOG',
      stat_key: 'shots',
    },
    points: {
      enabled: true,
      label: 'Points',
      label_short: 'PTS',
      stat_key: 'points',
    },
    powerplay_points: {
      enabled: true,
      label: 'Powerplay Points',
      label_short: 'PPP',
      stat_key: 'powerplay_points',
    },
    blocked_shots: {
      enabled: true,
      label: 'Blocked Shots',
      label_short: 'BKS',
      stat_key: 'blocked_shots',
    },
  },
} as const;

function normalizeWagerTypeText(string: string) {
  return string?.replace(/_/g, ' ')?.toUpperCase();
}

export function isSupportedWagerTypeForSport(sport: string, wagerType: string) {
  return !!DFS_AVAILABLE_WAGER_TYPE_BY_SPORT_MAP[sport]?.[wagerType]?.enabled;
}

// Returns full label (Receiving Yards, Passing TDs). Default to wagerType key without '_'.
export function getFullLabelFromWagerType(sport: string, wagerType: string) {
  return (
    DFS_AVAILABLE_WAGER_TYPE_BY_SPORT_MAP[sport]?.[wagerType]?.label ||
    normalizeWagerTypeText(wagerType)
  );
}

// Returns label_short if exists, otherwise full label (rec yd, pass td, ...)
export function getShortLabelFromWagerType(sport: string, wagerType: string) {
  return (
    DFS_AVAILABLE_WAGER_TYPE_BY_SPORT_MAP[sport]?.[
      wagerType
    ]?.label_short?.toUpperCase() || getFullLabelFromWagerType(sport, wagerType)
  );
}

// For NFL, returns last word from short_label (yd, td). Otherwise, return short label.
export function getTinyLabelFromWagerType(sport: string, wagerType: string) {
  const shortLabel = getShortLabelFromWagerType(sport, wagerType);
  return sport === 'nfl' ? shortLabel?.split(' ')?.pop() : shortLabel;
}
