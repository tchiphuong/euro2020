$(document).ready(function() {

    var score = "";
    var minute = "";
    setInterval(function () {
        var times = moment().format("dddd, DD/MM/YYYY, hh:mm:ss");
        $("#timenow").html(times)
        $.ajax({
            url: "https://match.uefa.com/v2/matches?fromDate=2021-06-11&toDate=2021-07-11&order=ASC&offset=0&limit=100&competitionId=3",
            dataType: "json",
            type: "GET",
        }).done(function (response) {
            for (let i = 0; i < Object.keys(response).length; i -= -1) {
                if(response[i]["minute"])
                {
                    $(".m" + response[i]["id"]).html(
                        response[i]["minute"]["normal"]+"'"
                    );
                }
                else{
                    $(".m" + response[i]["id"]).empty();
                }
                if (response[i]["score"]) {
                    $(".s" + response[i]["id"]).html(response[i]["score"]["regular"]["home"] + ` - `+ response[i]["score"]["regular"]["away"]);
                } else {
                    score = `<span>` +  + `</span>`;
                    $(".s" + response[i]["id"]).html(
                        `<span class="font-normal text-base">` + moment(response[i]["kickOffTime"]["dateTime"]).format("LT") + `</span>`
                    );
                }
            }
        })
    }, 1000);


    //match
    $.ajax({
        // url: "https://match.uefa.com/v2/matches?&order=ASC&offset=10&limit=1&competitionId=1&fromDate=2020-10-20&toDate=2021-05-29",
        url: "https://match.uefa.com/v2/matches?fromDate=2021-06-11&toDate=2021-07-11&order=ASC&offset=0&limit=100&competitionId=3",
        dataType: "json",
        type: "GET",
    }).done(function (response) {
        var date = "";
        var type = "";
        for (let i = 0; i < Object.keys(response).length; i -= -1) {
            if (i > 0) {
                if (moment(response[i]["kickOffTime"]["dateTime"]).format("DDMMYYYY") === moment(response[i - 1]["kickOffTime"]["dateTime"]).format("DDMMYYYY"))
                {
                    date = "";
                }
                else
                {
                    date = 
                    `
                        <div class="flex flex-col w-full p-2 md:w-6/12 xl:w-4/12 2xl:w-3/12" data-aos="fade-up" data-aos-duration="2000">
                            <div class="w-full overflow-hidden bg-white shadow-md cursor-pointer rounded-xl" id="match` + moment(response[i]["kickOffTime"]["dateTime"]).format("DDMMYYYY") + `">
                                <div class="p-3 font-bold uppercase">` + moment(response[i]["kickOffTime"]["dateTime"]).format("DD/MM/YYYY") + `</div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }
            else
            {
                date = 
                    `
                        <div class="flex flex-col w-full p-2 md:w-6/12 xl:w-4/12 2xl:w-3/12" data-aos="fade-up" data-aos-duration="2000">
                            <div class="w-full overflow-hidden bg-white shadow-md cursor-pointer rounded-xl" id="match` + moment(response[i]["kickOffTime"]["dateTime"]).format("DDMMYYYY") + `">
                                <div class="p-3 font-bold uppercase">` + moment(response[i]["kickOffTime"]["dateTime"]).format("DD/MM/YYYY") + `</div>
                                </div>
                            </div>
                        </div>
                    `;
            }

            $("#matchData").append(date);
            if(response[i]["minute"])
            {
                minute = response[i]["minute"]["normal"]+"'";
            }
            else{
                minute = "";
            }
            if (response[i]["group"]) {
                type = `<div class="font-bold text-center">` + response[i]["group"]["metaData"]["groupName"] + `</div>`;
            } else {
                type = `<div class="font-bold text-center">` + response[i]["round"]["metaData"]["name"] + `</div>`;
            }
            if (response[i]["score"]) {
                score =  response[i]["score"]["regular"]["home"] + ` - `+ response[i]["score"]["regular"]["away"];
            } else {
                score = `<span class="font-normal text-base">` + moment(response[i]["kickOffTime"]["dateTime"]).format("LT") + `</span>`;
            }
    
            $("#match" + moment(response[i]["kickOffTime"]["dateTime"]).format("DDMMYYYY")).append(
                `
                    <div onclick="lineup(\'` + response[i]["id"] + `\');" x-data="{ lineup: false }" class="flex flex-col hover:opacity-80 hover:bg-gray-50 ` + response[i]["id"] + `">
                        <div class="py-2 border-t">` + type + `
                            <div @click="{ lineup = true }" class="flex items-center justify-center py-2">
                                <div class="w-4/12 px-2 text-right capitalize line-clamp-3">` + response[i]["homeTeam"]["internationalName"] + `</div>
                                <div>
                                    <img class="w-6 h-6" src="` + response[i]["homeTeam"]["logoUrl"] + `" alt="` + response[i]["homeTeam"]["internationalName"] + `">
                                </div>
                                <div class="w-3/12 text-center flex flex-col"><span class="font-bold text-lg s` + response[i]["id"] + `">` + score + `</span><span class="m` + response[i]["id"] + `">` + minute + `</span></div>
                                <div>
                                    <img class="w-6 h-6" src="` + response[i]["awayTeam"]["logoUrl"] + `" alt="` + response[i]["awayTeam"]["internationalName"] + `">
                                </div>
                                <div class="w-4/12 px-2 text-left capitalize line-clamp-3">` + response[i]["awayTeam"]["internationalName"] + `</div>
                            </div>
                        </div>
                        <div class="lineup` + response[i]["id"] + `"></div>
                    </div>
                    `
            );
                // lineup(response[i]["id"]);
        }
    });



    //group
    $.ajax({
        url: "https://standings.uefa.com/v1/standings?groupIds=2006438,2006439,2006440,2006441,2006442,2006443",
        dataType: "json",
        type: "GET",
    }).done(function (response) {
        for (let i = 0; i < Object.keys(response).length; i -= -1) {
            $("#groupData").append(
                `
                    <div data-aos="fade-up" data-aos-duration="2000" class="w-full px-2 md:w-6/12 xl:w-4/12">
                        <div class="flex flex-col w-full p-3 my-2 bg-white shadow-md cursor-pointer rounded-xl">
                            <div class="font-bold uppercase">` + response[i]["group"]["metaData"]["groupName"] + `</div>
                            <table>
                                <thead>
                                    <tr class="text-sm bg-white">
                                        <th colspan="3"></th>
                                        <th class="w-1/12 my-2 text-center">P</th>
                                        <th class="w-1/12 my-2 text-center">W</th>
                                        <th class="w-1/12 my-2 text-center">D</th>
                                        <th class="w-1/12 my-2 text-center">L</th>
                                        <th class="w-1/12 my-2 text-center">+/-</th>
                                        <th class="w-1/12 my-2 text-center">Pts</th>
                                    </tr>
                                </thead>
                                <tbody id="group` + response[i]["group"]["id"] + `">

                                </tbody>
                            </table>
                        </div>
                    </div>
                `
            );
            for (let j = 0; j < Object.keys(response[i]["items"]).length; j -= -1)
            {
                $("#group" + response[i]["group"]["id"]).append(
                    `
                    <tr class="text-sm md:text-base bg-white border-t hover:opacity-80">
                        <td class="w-1/12 px-1 my-2 text-center">` + response[i]["items"][j]["rank"] + `</td>
                        <td class="w-6"><img class="w-full" src="` + response[i]["items"][j]["team"]["bigLogoUrl"] + `" alt="` + response[i]["items"][j]["team"]["internationalName"] + `"></td>
                        <td class="w-full p-1 my-2 capitalize line-clamp-1">` + response[i]["items"][j]["team"]["internationalName"] + `</td>
                        <td class="w-1/12 my-2 text-center">` + response[i]["items"][j]["played"] + `</td>
                        <td class="w-1/12 my-2 text-center">` + response[i]["items"][j]["won"] + `</td>
                        <td class="w-1/12 my-2 text-center">` + response[i]["items"][j]["drawn"] + `</td>
                        <td class="w-1/12 my-2 text-center">` + response[i]["items"][j]["lost"] + `</td>
                        <td class="w-1/12 my-2 text-center">` + response[i]["items"][j]["goalDifference"] + `</td>
                        <td class="w-1/12 my-2 text-center">` + response[i]["items"][j]["points"] + `</td>
                    </tr>`
                );
            }
        }
    });

    //team
    function team(id, name, logo)
        {
            $("#teamData").append(
                        `
                        <div x-data="{ list: false}" class="relative w-full p-2 md:w-6/12 xl:w-4/12 2xl:w-3/12">
                            <div data-aos="fade-up" data-aos-duration="1000" @click="list = true" class="flex py-3 bg-white shadow-md rounded-xl hover:opacity-80">
                                <div class="flex items-center justify-center h-24 w-28">
                                    <img class="w-20 h-20" src="` + logo + `" alt="` + name + `">
                                </div>
                                <div class="flex flex-col">
                                    <div class="px-2 font-bold truncate">` + name + `</div>
                                    <ul class="flex flex-wrap flex-grow m-1" id="team` + id + `">
                                    </ul>
                                </div>
                            </div>
                            <div x-show.in.transition.200ms="list" @click.away="list = false" class="absolute z-20 overflow-hidden bg-white shadow-xl top-28 rounded-xl inset-x-2">
                                <ul class="overflow-y-scroll m max-h-72 scrollbar-hide" id="team` + id + `">
                                    
                                </ul>
                            </div>
                        </div>
                        `
                    );
                    numberOfMatches(5,id);
        }


        $.ajax({
        url: 'https://comp.uefa.com/v2/teams?competitionId=3&limit=24&offset=0',
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
            var sortedData = [];
            $("#teamData").empty();
            for (let i = 0; i < Object.keys(response).length; i -= -1)
            {
                sortedData.push(response[i]);
            }
            sortedData.sort(function(a, b) {
                return a.internationalName.localeCompare(b.internationalName)
            });

            // console.log(sortedData);
            for(let i = 0; i < sortedData.length; i -= -1)
            {
                team(sortedData[i]["id"],sortedData[i]["internationalName"],sortedData[i]["mediumLogoUrl"],i);
            }
        });


        

        //numberOfMatches
        function numberOfMatches(limit,teamIds)
        {
            $('#team' + teamIds).empty();
            $.ajax({
                url: 'https://data-card.uefa.com/v1/form-guide?numberOfMatches=' + limit + '&teamIds=' + teamIds,
                dataType: 'json',
                type: 'GET',
            }).done(function(response) {
                for (let i = 5; i > 0 ; i--)
                {
                    switch (response["data"][0]["formguide"][i-1]["outcome"]) {
                        case 'WIN':
                            $('#team' + response["data"][0]["team"]["id"]).append(
                                `
                                    <li class="flex items-center justify-center m-1 text-xs text-white bg-green-500 rounded-full h-8 w-8 lg:h-9 lg:w-9">` + response["data"][0]["formguide"][i-1]["outcome"].substring(0, 1) + `</li>
                                `
                            );
                          break;
                        case 'DRAW':
                            $('#team' + response["data"][0]["team"]["id"]).append(
                                `
                                    <li class="flex items-center justify-center m-1 text-xs text-white bg-gray-500 rounded-full h-8 w-8 lg:h-9 lg:w-9">` + response["data"][0]["formguide"][i-1]["outcome"].substring(0, 1) + `</li>
                                `
                            );
                          break;
                        default:
                            $('#team' + response["data"][0]["team"]["id"]).append(
                                `
                                    <li class="flex items-center justify-center m-1 text-xs text-white bg-red-500 rounded-full h-8 w-8 lg:h-9 lg:w-9">` + response["data"][0]["formguide"][i-1]["outcome"].substring(0, 1) + `</li>
                                `
                            );
                      }
                    
                }
            });
            
        }

        
        
    
});

function playerType(res)
        {
            var playerType = "";
            if(res == "CAPTAIN")
            {
                playerType = `<span class="px-1">(C)</span>`;
            }
            else if(res == "GOALKEEPER")
            {
                playerType  = `<span class="px-1">(GK)</span>`;
            }
            else if(res == "GOALKEEPER_CAPTAIN")
            {
                playerType  = `<span class="px-1">(GK)</span><span class="px-1">(C)</span>`;
            }
            else
            {
                playerType = "";
            }
            
            return playerType;
            
        }

        function toolTip(tag)
        {
            tippy(tag, {
                content:(reference)=>reference.getAttribute('data-title'),
                 onMount(instance) {
                    instance.popperInstance.setOptions({
                      placement :instance.reference.getAttribute('data-placement')
                    });
                },
                allowHTML: true,
              });
        }


// lineup
function lineup(matchId)
{
    $.ajax({
        url: 'https://match.uefa.com/v3/matches/'+ matchId +'/lineups',
        dataType: 'json',
        type: 'GET',
    }).done(function(response) {
        if(response["lineupStatus"] == "NOT_AVAILABLE")
        {
            return
        }
        else
        {
            $("#load").append(
                `
                <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
                    <svg width="51px" heigth="50px" viewBox="0 0 51 50">
                        <rect y="0" width="13" height="50" fill="#1fa2ff">
                        <animate attributeName="height" values="50;10;50;" begin="0s" dur="1s" repeatCount="indefinite" />
                        <animate attributeName="y" values="0;20;0;" begin="0s" dur="1s" repeatCount="indefinite" />
                        </rect>
                        <rect x="19" y="0" width="13" height="50" fill="#12d8fa">
                        <animate attributeName="height" values="50;10;50;" begin="0.2s" dur="1s" repeatCount="indefinite" />
                        <animate attributeName="y" values="0;20;0;" begin="0.2s" dur="1s" repeatCount="indefinite" />
                        </rect>
                        <rect x="38" y="0" width="13" height="50" fill="#06ffcb">
                        <animate attributeName="height" values="50;10;50;" begin="0.4s" dur="1s" repeatCount="indefinite" />
                        <animate attributeName="y" values="0;20;0;" begin="0.4s" dur="1s" repeatCount="indefinite" />
                        </rect>
                    </svg>
                </div>
                `
            )
            $(".lineup" + matchId).empty();
            setTimeout(() => { 
            $(".lineup" + matchId).append(
                `
                    <div x-show.transition.origin.left.top.in.duration.200ms.out.duration.50ms="lineup" @click.away="lineup = false" class="inset-x-0 flex flex-col px-2 mb-2 top-20 rounded-xl">    
                        <div class="pt-3 pb-2 font-bold text-center capitalize" id="lineup">Lineup</div>
                        <div class="flex justify-between bg-white rounded-lg overflow-hidden hover:shadow opacity-100">
                            <ul id="lineUpHomeTeam` + matchId + `" class="flex flex-col items-start w-full">
                            </ul>
                            <ul id="lineUpAwayTeam` + matchId + `" class="flex flex-col items-end w-full bg-white">
                            </ul>
                        </div>
                        <div class="pt-3 pb-2 font-bold text-center capitalize" id="substitute">substitute</div>
                        <div class="flex justify-between bg-white rounded-lg overflow-hidden hover:shadow opacity-100">
                            <ul id="subHomeTeam` + matchId + `" class="flex flex-col items-start w-full">
                            </ul>
                            <ul id="subAwayTeam` + matchId + `" class="flex flex-col items-end w-full bg-white">
                            </ul>
                        </div>
                    </div>
                `
            );

            for (let i = 0; i < Object.keys(response["homeTeam"]["field"]).length; i -= -1)
            {
                $("#lineUpHomeTeam" + response["matchId"]).append(
                    `
                    <li class="flex text-sm items-center justify-start w-full p-1">
                        <span class="w-2/12 p-1 text-center">` + response["homeTeam"]["field"][i]["jerseyNumber"] + `</span>
                        <img class="w-8 h-8 mr-1 bg-gray-100 rounded-full" src="` + response["homeTeam"]["field"][i]["player"]["imageUrl"] + `" alt="` + response["homeTeam"]["field"][i]["player"]["translations"]["shortName"]["EN"] + `">
                        <span id="player" data-title='` + response["homeTeam"]["field"][i]["player"]["translations"]["name"]["EN"] + playerType(response["homeTeam"]["field"][i]["type"]) + `' data-placement="top" class="p-1 truncate">` + response["homeTeam"]["field"][i]["player"]["translations"]["shortName"]["EN"] + playerType(response["homeTeam"]["field"][i]["type"]) + `</span>
                    </li>
                    `
                );
                toolTip('#player');
            }

            for (let i = 0; i < Object.keys(response["homeTeam"]["bench"]).length; i -= -1)
            {
                $("#subHomeTeam" + response["matchId"]).append(
                    `
                    <li class="flex text-sm items-center justify-start w-full p-1">
                        <span class="w-2/12 p-1 text-center">` + response["homeTeam"]["bench"][i]["jerseyNumber"] + `</span>
                        <img class="w-8 h-8 mr-1 bg-gray-100 rounded-full" src="` + response["homeTeam"]["bench"][i]["player"]["imageUrl"] + `" alt="` + response["homeTeam"]["bench"][i]["player"]["translations"]["shortName"]["EN"] + `">
                        <span id="player" data-title='` + response["homeTeam"]["bench"][i]["player"]["translations"]["name"]["EN"] + playerType(response["homeTeam"]["bench"][i]["type"]) + `' data-placement="top" class="p-1 truncate">` + response["homeTeam"]["bench"][i]["player"]["translations"]["shortName"]["EN"] + playerType(response["homeTeam"]["bench"][i]["type"]) + `</span>
                    </li>
                    `
                );
                toolTip('#player');
            }
            
            for (let i = 0; i < Object.keys(response["awayTeam"]["field"]).length; i -= -1)
            {
                $("#lineUpAwayTeam" + response["matchId"]).append(
                    `
                    <li class="flex text-sm items-center justify-end w-full p-1">
                        <span id="player" data-title='` + playerType(response["awayTeam"]["field"][i]["type"]) + response["awayTeam"]["field"][i]["player"]["translations"]["name"]["EN"] + `' data-placement="top" class="p-1 text-right truncate">` + playerType(response["awayTeam"]["field"][i]["type"]) + response["awayTeam"]["field"][i]["player"]["translations"]["shortName"]["EN"] + `</span>
                        <img class="w-8 h-8 mr-1 bg-gray-100 rounded-full" src="` + response["awayTeam"]["field"][i]["player"]["imageUrl"] + `" alt="` + response["awayTeam"]["field"][i]["player"]["translations"]["shortName"]["EN"] + `">
                        <span class="w-2/12 p-1 text-center">` + response["awayTeam"]["field"][i]["jerseyNumber"] + `</span>
                    </li>
                    `
                );
                toolTip('#player');
            }
            
            for (let i = 0; i < Object.keys(response["awayTeam"]["bench"]).length; i -= -1)
            {
                $("#subAwayTeam" + response["matchId"]).append(
                    `
                    <li class="flex text-sm items-center justify-end w-full p-1">
                        <span id="player" data-title='` + playerType(response["awayTeam"]["bench"][i]["type"]) + response["awayTeam"]["bench"][i]["player"]["translations"]["name"]["EN"] + `' data-placement="top" class="p-1 text-right truncate">` + playerType(response["awayTeam"]["bench"][i]["type"]) + response["awayTeam"]["bench"][i]["player"]["translations"]["shortName"]["EN"] + `</span>
                        <img class="w-8 h-8 mr-1 bg-gray-100 rounded-full" src="` + response["awayTeam"]["bench"][i]["player"]["imageUrl"] + `" alt="` + response["awayTeam"]["bench"][i]["player"]["translations"]["shortName"]["EN"] + `">
                        <span class="w-2/12 p-1 text-center">` + response["awayTeam"]["bench"][i]["jerseyNumber"] + `</span>
                    </li>
                    `
                );
                toolTip('#player');
                $("#load").empty();
            }
            
        }, 1);
        }
    });
    
}
    

// team https://comp.uefa.com/v1/teams/135,57166
// league https://comp.uefa.com/v1/competitions/3
// line up https://match.uefa.com/v3/matches/2029498/lineups
// match https://data-card.uefa.com/v1/form-guide?matchId=2024448&numberOfMatches=5
// all team https://comp.uefa.com/v1/competitions/3/teams
// eu20 https://comp.uefa.com/v2/teams?competitionId=3&seasonYear=2020&limit=100&offset=0

// group https://standings.uefa.com/v1/standings?competitionId=3&seasonYear=2020

// live https://broadcaster.uefa.com/v1/broadcasters?offset=0&limit=100&countryCode=VN