
export function formatDate(date: string){
    const createdDate = new Date(date);

    return  new Intl.DateTimeFormat("en-UK", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(createdDate);
}