// Character data imported from google sheet
export interface CharacterData {
    id?: string;
    name?: string;
    race?: string;
    level?: number;
    class?: string;
    subclass?: string;
    secondary_class?: string;
    secondary_subclass?: string;
    gold?: number;
    status?: 'Active' | 'Inactive' | 'Dead' | string;
    exp?: number;
    games?: number;
    last_game?: string;
    buddies?: string | string[];
    player?: string;
    avatar_url?: string;
  }

// Style configurations
type SpacingSideValues = {
    all?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

type TextValues = {
    xsmall?: string;
    small?: string;
    medium?: string;
    large?: string;
    xlarge?: string;
    header?: string;
    subheader?: string;
}

export type StyleConfig = {
    padding?: string | SpacingSideValues;
    margin?: string | SpacingSideValues;
    text?: string | TextValues;
}
