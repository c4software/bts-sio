// Les dernières pages créées ou modifiées (voir ../recent.ts), pour
// <RecentPages /> : section « Nouveautés » de l'accueil et page /nouveautes.
import path from 'node:path'
import { recentPages, type RecentPage } from '../recent'

declare const data: RecentPage[]
export { data }

export default {
  load(): RecentPage[] {
    return recentPages(path.resolve(__dirname, '../..'))
  },
}
