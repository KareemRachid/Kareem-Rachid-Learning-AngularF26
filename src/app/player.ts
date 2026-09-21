export interface Player {
name: string;
number: number;
position: 'Forward' | 'Midfielder' | 'Defender' | 'Goalkeeper';
team: string;
nationality?: string;

}