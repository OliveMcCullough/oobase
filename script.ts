import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const ooblets = await prisma.ooblet.findMany({
    include: {
      regions: true,
      itemType: true,
      moves: true,
    }
  })
  console.log(ooblets)
  /*
  const ooblet = await prisma.ooblet.create({
    data: {
      name: 'Bibbin',
      desc: 'A Badgetown-native ooblet partial to rainy days.',
      itemAmount: 2,
      regions: { create: {name: "Badgetown"} },
      itemType: { create: {name: "Soggy Bread"} },
      moves: { 
        create: [
          {
            name: "Drizzle Drop", 
            desc: "Gain 3 points plus an extra 2 hype if it's raining",
            cost: 3
          },
          {
            name: "Bibbin Bop", 
            desc: "Complete a growth cycle on a random farm crop",
            cost: 4
          },
          {
            name: "Flora Flip", 
            desc: "Randomize & regrow all region forageables",
            cost: 6
          }
        ]
      }
    },
  })
  // */
  /*
  const ooblet = await prisma.ooblet.update({
    where: { name: "Angkze"},
    data: { 
      regions: { create: {name: "Port Forward"} },
      itemType: { create: {name: "Soggy Balloons"} },
      moves: { create: 
        [
          {
            name: "Daze Raise", 
            desc: "Stun one of your team's ooblets for 2 turns, gain 6 points", 
            cost: 1
          },
          {
            name: "Double Dutch Clutch", 
            desc: "Gain 2 fluster, get 3 extra beats next turn", 
            cost: 2
          },
          {
            name: "Consolation Deflation", 
            desc: "Discard all moves in hand, get equal number of extra beats next turn", 
            cost: 3
          }
        ]
      }
    }
  }) 
  //
  console.log(ooblet)
  // */
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })