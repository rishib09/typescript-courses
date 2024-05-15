export class Video {
    Duration(): string {
      return "1:10:00"
    }
  }
  
  declare module '../lib/registry' {
    export interface DataTypeRegistry {
      video: Video
    }
  }
  