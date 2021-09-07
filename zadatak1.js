//1.
db.knjizara.find(
  {
    cena: 
    { 
        $elemMatch: {
            $and: 
            [
                    {
                        iznos: { $gt: 200 }
                    },
                    {
                       drzava: "Srbija"
                    }
            ]
         }
    },
    zanr: "Roman"
  },
  {
      naslov: 1,
      autor: 1,
      brojStrana: 1,
      cena: 1,
      _id: 0
  }
)

//2.
db.knjizara.find(
    {
        godinaIzdanja: { $gte: 2000, $lte: 2005 }
    },
    {
        naslov: 1,
        godinaIzdanja: 1,
        _id: 0
    }
)

//3.
db.knjizara.updateMany(
    {
        $and: 
        [
            {zanr: "Istorijski"}, {izdanje: "Strano"}
        ]
    },
    {
        $push: 
        {
            komentari: 
            {
                $each: 
                [
                    {
                        id: 2,
                        ocena: 4.3
                    },
                    {
                        id: 3,
                        ocena: 2.31
                    }
                ]
            }
        }
    }
)

//4)
db.knjizara.aggregate([
    { $unwind: "$cena" },
    { 
        $match: 
        {
            "cena.drzava": "Makedonija"
        }
    },
    {
        $project: 
        {
            "cena": "$cena.iznos",
            "naslov": 1,
            _id: 0
          }
    },
    {
        $sort: 
        {
            "cena": 1
        }
    },
    { $limit: 1 }
])

//5)
db.knjizara.aggregate([
    { $unwind: "$komentari" },
    { 
        $group: 
        {
            _id: { "brojStrana": "$brojStrana", "zanr": "$zanr"},
            ProsecnaOcena: { $avg: "$komentari.ocena" },
          }
        
    },
    { 
        $match: 
        {
            "_id.zanr": "Triler",
            "ProsecnaOcena": { $gte: 4 }
        }
    },
    {
        $project: 
        {
            "BrojStrana": "$_id.brojStrana",
            _id: 0
          }
    }
])
