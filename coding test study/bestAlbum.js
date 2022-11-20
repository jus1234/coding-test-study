// 1. 같은 장르끼 묶기
// 2.묶인 노들ㅣ리 재생 순으로 정렬
// 3. 노를 2개지 자르는 작업

function solution(genres, plays) {
    const genreMap = genres
        .map((genre, index) => [genre, plays[index]])
        .reduce((acc, [genre, play], index) => {
            const data = acc.get(genre) || { total: 0, songs: [] };
            acc.set(genre, {
                total: data.total + play,
                songs: [...data.songs, { play, index }]
                    .sort((a, b) => b.play - a.play)
                    .slice(0, 2),
            });
            return acc;
        }, new Map());
    return [...genreMap.entries()]
        .sort((a, b) => b[1].total - a[1].total)
        .flatMap((item) => item[1].songs)
        .map((song) => song.index);
}

let genres = ["classic", "pop", "classic", "classic", "pop"];
let plays = [500, 600, 150, 800, 2500];
console.log(solution(genres, plays)); //[4, 1, 3, 0]
