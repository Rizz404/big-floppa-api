export default interface BaseReqQuery {
  page: string;

  limit: string;

  order: "asc" | "desc";
}
