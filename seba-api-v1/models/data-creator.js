const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const User = require("./user")(sequelize, Sequelize);
const Music = require("./music")(sequelize, Sequelize);
const Playlist = require("./playlist")(sequelize, Sequelize);
const Featured = require("./featured")(sequelize, Sequelize);
const Comment = require("./comment")(sequelize, Sequelize);

module.exports = {
  relationInit: () => {
    User.hasMany(Music);
    Music.belongsTo(User);

    User.hasOne(Playlist);
    Playlist.belongsTo(User);

    User.hasMany(Comment);
    Comment.belongsTo(User);

    User.hasMany(Featured);
    Featured.belongsTo(User);

    Music.belongsToMany(Playlist, {
      through: "playlist_music"
    });
    Playlist.belongsToMany(Music, {
      through: "playlist_music"
    });

    Music.hasMany(Featured);
    // Featured.belongsTo(Music);

    Music.hasMany(Comment);
    Comment.belongsTo(Music);
  },

  dataInit: sequelize => {
    Music.create({
      title: "탈모(feat.big bear)(prod. hecop music)",
      musician: "Hanfecu(한페큐)",
      musicianImg:
        "https://i1.sndcdn.com/avatars-000494686350-mc3f1i-large.jpg",
      description:
        "믹싱.에이차피\nIntro\n당신은 탈모빔에 맞았습니다 이 곡이 끝나기 전까지 자라나라 머리머리를 외치지 않으면 머리가 수북히 빠지게 됩니다.\nHook\n적들을 향해 쏜 탈모빔 \n아침에 거울 보니 머리 빠졌지\n꼬우면 주문을 외워\n꼬우면 주문을 외워\n자라나라 머리머리 ouu\n자라나라 머리머리 ya\nV.1\nBlack nut의 포부는 팀을 낭떠러지로 밀어\n내 포부는 니 머리부터 발 끝 까지 밀어 (오로나민c 톤으로)\n바리깡 없이 양손 모아 쏘지 탈 모빔 \n어리바리 까는 동안 머리카락 cut it cut it\n물론 거기까지 밀어버림\n클럽 안가도 되겠다 24시간 빛나는 \n니머리 미러볼\n빛나는 존재 되고 싶다매 이제 \n그 목표 이뤘어\n미용실 안가도 되 샴푸도 적게 쓰니 \n환경에 도움 되 절약도 oh yeah \nBridge\n니 워너비가 혁오밴드 아니라면 꺼져\n양손 모아 탈모빔을 쏴 맞으면 넌 fucked up\nOuu 가발은 필수 삭발은 선택 by 갱복치\n발악해도 빡빡머리 민머리 대머리\nHook\n적들을 향해 쏜 탈모빔 \n아침에 거울 보니 머리 빠졌지\n꼬우면 주문을 외워\n꼬우면 주문을 외워\n자라나라 머리머리 ouu\n자라나라 머리머리 ya\nV.2\n이젠 난 할 필요 없어\n자라나라 머리머리 \n이젠 너무 커버려서 커버안되는 실력이지  whut\n솔직히 말해서 너네들 머리 없는건 어쩔수 없어\n타고난 유전이지 그래 내 머리 존나 많은 것도 유전이지\n난 한마디로 터진 잭팟아님 유전이지 돈 존나 많이 번단거지\n불만 있음 머리털 걸고 싸우자는 거지\nbut you can't do that 니 머리털 걸기는 쫄려서\n못할꺼라는건 내가 너무 잘알지 woo\n제발 못할꺼면 덤비지 말고 조용히 있길 ma dummie\n제발 덤빌꺼라면 최소 하이모에서 가발이라도 맞춰오길 woo\nBridge\n니 워너비가 혁오밴드 아니라면 꺼져\n양손 모아 탈모빔을 쏴 맞으면 넌 fucked up\nOuu 가발은 필수 삭발은 선택 by 갱복치\n발악해도 빡빡머리 민머리 대머리\nHook\n적들을 향해 쏜 탈모빔 \n아침에 거울 보니 머리 빠졌지\n꼬우면 주문을 외워\n꼬우면 주문을 외워\n자라나라 머리머리 ouu\n자라나라 머리머리 ya\nOutro\n이 빙신들아 니네 어차피 탈모야 탈모갤에서 놀아라",
      artworkImg:
        "https://i1.sndcdn.com/artworks-000394444782-qmy3sr-large.jpg",
      duration: 221172,
      url: "https://soundcloud.com/dp1rv1baiqxn/prod-hecop-music",
      streamUrl: "https://api.soundcloud.com/tracks/490398075/stream",
      playCount: 0,
      createdAtSoundcloud: "2018/08/25 09:42:17"
    }).then(music => {
      User.create(
        {
          name: "seba2",
          email: "seba2@gmail.com",
          snsFacebook: "seba2@facebook.com",
          snsInstagram: "seba2@instagram.com",
          snsTwitter: "seba2@twitter.com",
          playlist: {}
        },
        {
          include: Playlist
        }
      ).then(user => {
        user.addMusic(music);
      });
    });

    Music.create({
      title: "찌질하다는건 나의 의견이 아니다 Prod.j'san",
      musician: "개미친구(GamichinGoo)",
      musicianImg:
        "https://i1.sndcdn.com/avatars-000547422291-584oku-large.jpg",
      description:
        "구름이 예쁘다\n\n\n사실 너가\n\n예쁜건데  \n\n\n바람이 포옹같구나\n\n\n사실 너가 \n\n안고싶은건데 \n\n\n\n배가 자꾸 허전해\n\n\n사실 너가 \n\n보고싶은건데\n\n\n\n아 이제는 익숙해\n\n\n사실 너가\n\n있어야 괜찮을텐데 \n\n\n\n\n이제야 뭐가 중요한지 잘 알아 \n\n모든걸 쏟아야할게 무엇이었는지 말야\n\n의미가 없어진 갇혀진 시간 안\n\n장면을 되풀이하며 흐르는걸 닦아",
      artworkImg:
        "https://i1.sndcdn.com/artworks-000459236814-60fz1f-large.jpg",
      duration: 108627,
      url: "https://soundcloud.com/42kgb/loveshitcantloveher",
      streamUrl: "https://api.soundcloud.com/tracks/545706672/stream",
      playCount: 0,
      createdAtSoundcloud: "2018/12/16 11:30:40"
    }).then(music => {
      User.create(
        {
          name: "seba0",
          email: "seba0@gmail.com",
          snsFacebook: "seba0@facebook.com",
          backgroundImg: "backgroundImg",
          playlist: {}
        },
        {
          include: Playlist
        }
      ).then(user => {
        user.addMusic(music);
        Comment.create({
          content: "comment0"
        }).then(comment => {
          user.addComment(comment);
          music.addComment(comment);
        });
        Comment.create({
          content: "comment1"
        }).then(comment => {
          user.addComment(comment);
          music.addComment(comment);
        });
        Featured.create({
          type: "FLOW"
        }).then(featured => {
          user.addFeatured(featured);
          music.addFeatured(featured);
        });
        Featured.create({
          type: "FLOW"
        }).then(featured => {
          user.addFeatured(featured);
          music.addFeatured(featured);
        });
        Featured.create({
          type: "BEAT"
        }).then(featured => {
          user.addFeatured(featured);
          music.addFeatured(featured);
        });
        Featured.create({
          type: "PUNCHLINE"
        }).then(featured => {
          user.addFeatured(featured);
          music.addFeatured(featured);
        });
      });
    });

    Music.create({
      title: "래퍼의 삶이란게 원래 다 이런건가요 (Prod. Boy fifty)",
      musician: "Scentok (쎈톡)",
      musicianImg:
        "https://i1.sndcdn.com/avatars-000521203020-ex9f0k-large.jpg",
      description:
        "Verse1)\n\n래퍼를 하려면 다 이런건가요?\n눈 뜨자 마자 난 죄책감을 착용\n봐도봐도 너무나 달라 TV속의\n래퍼들과 난, 아침식사가\n고정이 돼 가네, 김치와 간장 계란밥\n물론 난 맛있게 먹을 수도 있어\n친구들 하나 둘 정장입고\n축하를 하지만 적잖이 또\n마음이 시리네 적자지 뭐\n내 음악은 여전히 시원치않어\n자격증 몇개를 따 놨어\n불안. 죄책감이 발목 잡아서\n담주부터는 영어학원 다녀\n이젠 진짜로 포기할 때 왔어\n포긴 익숙하지 내가 지금껏\n제일 잘해왔던 것이니 진짜 자신있지\n지금 껏, 버텨왔던 오기가\n오히려 내겐 낯선 것\n딱 한번. 딱 한번만 난 기도를 했었지\n거만한 소리도 했었지 얼마나\n병신 같았을지 몰라\n퇴근한 아버지 지친 눈빛이, 날 짓누르고\n어머니 응원도 날 짓눌러\n래퍼는 진짜 너무 힘들어\n스케쥴 없이도 힘들어\n스캔들 없어도 힘들어\n래퍼는 정말 힘들어\n래퍼는 3d 직업 같아\n\nVerse2)\n\n무대에 서는게 마냥 기뻤었는데 이젠 귀찮네\n가사를 쓰는게 항상 힘들었는데 이젠 괜찮네\n나를 자랑할 때에 힘이 났었는데, 이젠 힘드네\n난 변해왔나봐, 또 변해가나봐, 이제 그냥 하나봐\n나라고 특별할 건 없단걸, 특별한 일을 하며 알게됐지\n모든 걸 증명할 수 없단 걸, 증명되지 않는 마음으로 알아냈지\n노가다 하면서 랩하는 내 동생들에게 존경을\n회사다니며 음악하는 나의 형들에게도 존경을\n난 어떤 존경도 못받을 래퍼가 돼버렸네\n뭔가를 남기고픈 맘은 굴뚝 같지만\n음악은 내게 산타아냐\n퇴근한 아버지 지친 눈빛이 날 짓누르고\n어머니 응원도 날 짓눌러\n래퍼는 진짜 너무 힘들어\n스케쥴 없어도 힘들어\n스캔들 없이도 힘들어\n래퍼는 정말 힘들어\n래퍼는 3D 직업 같아",
      artworkImg:
        "https://i1.sndcdn.com/artworks-000406292886-wpouvc-large.jpg",
      duration: 215111,
      url: "https://soundcloud.com/scentok/prod-boy-fifty",
      streamUrl: "https://api.soundcloud.com/tracks/500645352/stream",
      playCount: 0,
      createdAtSoundcloud: "2018/09/16 12:14:05"
    }).then(music => {
      User.create(
        {
          name: "seba1",
          email: "seba1@gmail.com",
          playlist: {}
        },
        {
          include: Playlist
        }
      ).then((user, playlist) => {
        user.addMusic(music);
        user.getPlaylist().then(playlist => playlist.addMusic(music));

        Comment.create({
          content: "comment2"
        }).then(comment => {
          user.addComment(comment);
          music.addComment(comment);
        });
      });
    });
  }
};
