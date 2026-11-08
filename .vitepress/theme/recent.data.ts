// Les nouveautés (pages créées ou modifiées de manière importante) et les
// mises à jour mineures (voir ../recent.ts), pour <RecentPages /> et
// <RecentUpdates /> : section « Nouveautés » de l'accueil et page /nouveautes.
import path from 'node:path'
import { recentData, type RecentData } from '../recent'

declare const data: RecentData
export { data }

export default {
  load(): RecentData {
    return recentData(path.resolve(__dirname, '../..'))
  },
}
