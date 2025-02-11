export const replaceUrlToLink = (input: string) => {
  const regexp_url = /https?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+/g;
  const regexp_makeLink = (url: string): string => {
    // _blankで別タブで表示
    // relに指定しているのは、別タブで開いた時元ページへバックできてしまうというバグを回避するためのもの
    return `<a href=${url} target="_blank" rel="noopener noreferrer">${url}</a>`;
  };
  return input.replace(regexp_url, regexp_makeLink);
};
