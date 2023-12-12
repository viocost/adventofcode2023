(defun parse-line (line)
  "Parses a single line into two lists."
  (let ((parts (split-sequence:split-sequence #\| line)))
    (list (parse-numbers (first parts))
          (parse-numbers (second parts)))))

(defun parse-numbers (str)
  "Converts a string of numbers into a list of numbers."
  (mapcar #'parse-integer (remove-if (lambda (x) (equal x "")) (split-sequence:split-sequence #\Space str))))

(defun read-and-parse-file (filename)
  "Reads a file and parses each line."
  (with-open-file (stream filename)
    (loop for line = (read-line stream nil)
          while line
          collect (parse-line line))))

(defun find-intersections (filename)
  "Finds the intersection of lists in the file."
  (let ((parsed-lines (read-and-parse-file filename)))
    (loop for (list1 list2) in parsed-lines
          collect (intersection list1 list2))))

;; Usage
(find-intersections "yourfile.txt")
