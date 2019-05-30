using System.Collections.Generic;

namespace JHipsterNet.Pagination {
    public abstract class Chunk<T> : ISlice<T> where T : class {
        public Chunk(List<T> content, IPageable pageable)
        {
            Content = new List<T>();
            if (content != null) ((List<T>) Content).AddRange(content);

            Pageable = pageable;
        }

        private IList<T> Content { get; }

        public int Number => Pageable.IsPaged ? Pageable.PageNumber : 0;

        public int Size => Pageable.IsPaged ? Pageable.PageSize : 0;

        public int NumberOfElements => Content.Count;

        IEnumerable<T> ISlice<T>.Content => Content;

        public Sort Sort => Pageable.Sort;

        public bool IsFirst => !HasPrevious;

        public bool IsLast => !HasNext;

        public abstract bool HasNext { get; }
        public bool HasPrevious => Number > 0;
        public IPageable Pageable { get; }

        public IPageable NextPageable => HasNext ? Pageable.Next : PageableConstants.UnPaged;

        public IPageable PreviousPageable => HasPrevious ? Pageable.PreviousOrFirst : PageableConstants.UnPaged;
    }
}
