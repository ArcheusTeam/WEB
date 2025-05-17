export type ToneOption = 
  | "dramatique" 
  | "ironique" 
  | "cringe" 
  | "classe" 
  | "touchant" 
  | "absurde" 
  | "passif-agressif" 
  | "honnête";

export interface ToneConfig {
  bgColor: string;
  textColor: string;
  emoji: string;
  shadow: string;
}

export interface Post {
  text: string;
  gifUrl: string;
  emoji: string;
}

export type DisplayState = "selection" | "generation" | "result";